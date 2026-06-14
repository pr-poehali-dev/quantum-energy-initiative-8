import json
import os
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Заявки на пробное занятие: создание и просмотр"""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400"}, "body": ""}

    method = event.get("httpMethod", "GET")
    conn = get_conn()
    cur = conn.cursor()

    try:
        if method == "POST":
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                "INSERT INTO trial_requests (name, phone, group_type, message) VALUES (%s, %s, %s, %s) RETURNING id",
                (body["name"], body["phone"], body.get("group_type", "children"), body.get("message", ""))
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps({"id": new_id, "success": True})}

        if method == "GET":
            cur.execute("SELECT id, name, phone, group_type, message, status, created_at FROM trial_requests ORDER BY created_at DESC")
            cols = [d[0] for d in cur.description]
            rows = [dict(zip(cols, row)) for row in cur.fetchall()]
            for r in rows:
                r["created_at"] = str(r["created_at"]) if r["created_at"] else None
            return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps(rows, ensure_ascii=False)}

        if method == "PUT":
            body = json.loads(event.get("body") or "{}")
            cur.execute("UPDATE trial_requests SET status = %s WHERE id = %s", (body["status"], body["id"]))
            conn.commit()
            return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps({"success": True})}

        return {"statusCode": 400, "headers": {"Access-Control-Allow-Origin": "*"}, "body": json.dumps({"error": "Unknown method"})}

    finally:
        cur.close()
        conn.close()
