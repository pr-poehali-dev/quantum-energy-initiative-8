import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import AttendanceModal from "@/components/manager/AttendanceModal";

const STUDENTS_URL = "https://functions.poehali.dev/a67ecb09-0b88-440d-bb9b-e07953a5747a";

interface Student {
  id: number;
  name: string;
  phone: string;
  group_type: string;
  visits_this_month: number;
  visits_total: number;
}

function calcDebt(visits: number, group: string): string {
  if (visits === 0) return "—";
  if (group === "adults") {
    if (visits === 1) return "700 ₽";
    if (visits <= 4) return "2 600 ₽";
    if (visits <= 6) return "3 800 ₽";
    return "5 000 ₽";
  }
  if (visits === 1) return "700 ₽";
  if (visits <= 4) return "2 600 ₽";
  if (visits <= 6) return "3 800 ₽";
  return "5 000 ₽";
}

const MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "children" | "adults">("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${STUDENTS_URL}?action=stats&month=${month}`);
      const data = await res.json();
      setStudents(data);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, [month]);

  const filtered = students.filter((s) => filter === "all" || s.group_type === filter);

  const [y, m] = month.split("-").map(Number);
  const monthLabel = `${MONTH_NAMES[m - 1]} ${y}`;

  const markAttendance = async (studentId: number) => {
    await fetch(STUDENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_attendance", student_id: studentId }),
    });
    fetchStudents();
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {[
            { value: "all", label: "Все" },
            { value: "children", label: "🧒 Дети" },
            { value: "adults", label: "🔥 Взрослые" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as typeof filter)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f.value
                  ? "bg-pink-500 text-white"
                  : "bg-white/8 text-white/60 hover:bg-white/15"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Icon name="Calendar" size={16} className="text-white/40" />
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-400 [color-scheme:dark]"
          >
            {Array.from({ length: 6 }, (_, i) => {
              const d = new Date();
              d.setMonth(d.getMonth() - i);
              const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
              const lbl = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
              return <option key={val} value={val}>{lbl}</option>;
            })}
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-white">{filtered.length}</div>
          <div className="text-white/50 text-xs mt-1">Активных учеников</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-pink-400">
            {filtered.reduce((s, st) => s + Number(st.visits_this_month), 0)}
          </div>
          <div className="text-white/50 text-xs mt-1">Посещений в {monthLabel}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-orange-400">
            {filtered.filter((s) => Number(s.visits_this_month) > 0).length}
          </div>
          <div className="text-white/50 text-xs mt-1">Ходили в этом месяце</div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-white/40">Загружаю...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <div className="text-4xl mb-3">👥</div>
          <p>Учеников нет. Добавьте первого!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((student) => {
            const visits = Number(student.visits_this_month);
            return (
              <div
                key={student.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/8 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-black text-sm shrink-0">
                  {student.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white">{student.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    {student.phone && (
                      <span className="text-white/40 text-xs">{student.phone}</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      student.group_type === "adults"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-pink-500/20 text-pink-400"
                    }`}>
                      {student.group_type === "adults" ? "Взрослая" : "Детская"}
                    </span>
                  </div>
                </div>

                <div className="text-center min-w-[80px]">
                  <div className="text-2xl font-black text-white">{visits}</div>
                  <div className="text-white/40 text-xs">посещений</div>
                </div>

                <div className="text-center min-w-[90px]">
                  <div className="text-lg font-black text-orange-400">{calcDebt(visits, student.group_type)}</div>
                  <div className="text-white/40 text-xs">к оплате</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => markAttendance(student.id)}
                    className="bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl px-3 py-2 text-xs font-semibold hover:bg-green-500/30 transition-colors flex items-center gap-1"
                  >
                    <Icon name="Check" size={14} />
                    Отметить
                  </button>
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="bg-white/8 text-white/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold hover:bg-white/15 transition-colors flex items-center gap-1"
                  >
                    <Icon name="History" size={14} />
                    История
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedStudent && (
        <AttendanceModal
          student={selectedStudent}
          month={month}
          onClose={() => { setSelectedStudent(null); fetchStudents(); }}
        />
      )}
    </div>
  );
}