import json
import os
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Управление учениками: CRUD + статистика посещений"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400"}, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}

    conn = get_conn()
    cur = conn.cursor()

    try:
        if method == "GET":
            action = params.get("action", "list")

            if action == "list":
                cur.execute("""
                    SELECT s.id, s.name, s.phone, s.group_type, s.active, s.created_at,
                        COUNT(a.id) FILTER (WHERE DATE_TRUNC('month', a.attended_at) = DATE_TRUNC('month', CURRENT_DATE)) AS visits_this_month,
                        COUNT(a.id) AS visits_total
                    FROM students s
                    LEFT JOIN attendances a ON a.student_id = s.id
                    WHERE s.active = true
                    GROUP BY s.id
                    ORDER BY s.name
                """)
                cols = [d[0] for d in cur.description]
                rows = [dict(zip(cols, row)) for row in cur.fetchall()]
                for r in rows:
                    r["created_at"] = str(r["created_at"]) if r["created_at"] else None
                return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps(rows, ensure_ascii=False)}

            if action == "attendance":
                student_id = params.get("student_id")
                month = params.get("month")
                if month:
                    cur.execute("SELECT id, attended_at FROM attendances WHERE student_id = %s AND TO_CHAR(attended_at, 'YYYY-MM') = %s ORDER BY attended_at DESC", (student_id, month))
                else:
                    cur.execute("SELECT id, attended_at FROM attendances WHERE student_id = %s ORDER BY attended_at DESC LIMIT 50", (student_id,))
                rows = [{"id": r[0], "attended_at": str(r[1])} for r in cur.fetchall()]
                return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps(rows)}

            if action == "stats":
                month = params.get("month", "")
                if not month:
                    from datetime import date
                    month = date.today().strftime("%Y-%m")
                cur.execute("""
                    SELECT s.id, s.name, s.phone, s.group_type,
                        COUNT(a.id) AS visits
                    FROM students s
                    LEFT JOIN attendances a ON a.student_id = s.id AND TO_CHAR(a.attended_at, 'YYYY-MM') = %s
                    WHERE s.active = true
                    GROUP BY s.id
                    ORDER BY s.name
                """, (month,))
                cols = [d[0] for d in cur.description]
                rows = [dict(zip(cols, row)) for row in cur.fetchall()]
                return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps(rows, ensure_ascii=False)}

        if method == "POST":
            body = json.loads(event.get("body") or "{}")
            action = body.get("action", "create")

            if action == "create":
                cur.execute("INSERT INTO students (name, phone, group_type) VALUES (%s, %s, %s) RETURNING id", (body["name"], body.get("phone", ""), body.get("group_type", "children")))
                new_id = cur.fetchone()[0]
                conn.commit()
                return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps({"id": new_id, "success": True})}

            if action == "mark_attendance":
                student_id = body["student_id"]
                date_str = body.get("date")
                if date_str:
                    cur.execute("INSERT INTO attendances (student_id, attended_at) VALUES (%s, %s) ON CONFLICT DO NOTHING", (student_id, date_str))
                else:
                    cur.execute("INSERT INTO attendances (student_id, attended_at) VALUES (%s, CURRENT_DATE) ON CONFLICT DO NOTHING", (student_id,))
                conn.commit()
                return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps({"success": True})}

            if action == "remove_attendance":
                attendance_id = body["attendance_id"]
                cur.execute("UPDATE attendances SET attended_at = attended_at WHERE id = %s", (attendance_id,))
                cur.execute("DELETE FROM attendances WHERE id = %s", (attendance_id,))
                conn.commit()
                return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps({"success": True})}

            if action == "deactivate":
                cur.execute("UPDATE students SET active = false WHERE id = %s", (body["student_id"],))
                conn.commit()
                return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps({"success": True})}

        return {"statusCode": 400, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps({"error": "Unknown action"})}

    finally:
        cur.close()
        conn.close()
