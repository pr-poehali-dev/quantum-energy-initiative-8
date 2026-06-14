import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const STUDENTS_URL = "https://functions.poehali.dev/a67ecb09-0b88-440d-bb9b-e07953a5747a";

interface Attendance {
  id: number;
  attended_at: string;
}

interface Props {
  student: { id: number; name: string; group_type: string };
  month: string;
  onClose: () => void;
}

const MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAY_NAMES = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];

function formatDate(d: string) {
  const dt = new Date(d);
  return `${DAY_NAMES[dt.getDay()]}, ${dt.getDate()} ${MONTH_NAMES[dt.getMonth()]}`;
}

export default function AttendanceModal({ student, month, onClose }: Props) {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${STUDENTS_URL}?action=attendance&student_id=${student.id}&month=${month}`);
      const data = await res.json();
      setRecords(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecords(); }, []);

  const addAttendance = async () => {
    await fetch(STUDENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_attendance", student_id: student.id, date }),
    });
    fetchRecords();
  };

  const removeAttendance = async (id: number) => {
    await fetch(STUDENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove_attendance", attendance_id: id }),
    });
    fetchRecords();
  };

  const [y, m] = month.split("-").map(Number);
  const monthLabel = `${MONTH_NAMES[m - 1]} ${y}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/15 rounded-3xl p-6 w-full max-w-md relative max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <Icon name="X" size={20} />
        </button>

        <div className="mb-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-black text-sm shrink-0">
              {student.name[0].toUpperCase()}
            </div>
            <div>
              <h3 className="font-black text-white text-lg">{student.name}</h3>
              <p className="text-white/50 text-xs">{monthLabel} · {records.length} посещений</p>
            </div>
          </div>
        </div>

        {/* Add attendance */}
        <div className="flex gap-2 mb-5">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-400 [color-scheme:dark]"
          />
          <button
            onClick={addAttendance}
            className="bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-green-500/30 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Icon name="Plus" size={14} />
            Добавить
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {loading ? (
            <div className="text-center py-8 text-white/40 text-sm">Загружаю...</div>
          ) : records.length === 0 ? (
            <div className="text-center py-8 text-white/40 text-sm">
              В {monthLabel} посещений нет
            </div>
          ) : (
            records.map((r, i) => (
              <div key={r.id} className="flex items-center justify-between bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-xs font-bold">{records.length - i}</span>
                  </div>
                  <span className="text-white text-sm">{formatDate(r.attended_at)}</span>
                </div>
                <button
                  onClick={() => removeAttendance(r.id)}
                  className="text-white/30 hover:text-red-400 transition-colors"
                  title="Удалить"
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}