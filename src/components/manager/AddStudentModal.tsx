import { useState } from "react";
import Icon from "@/components/ui/icon";

const STUDENTS_URL = "https://functions.poehali.dev/a67ecb09-0b88-440d-bb9b-e07953a5747a";

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

export default function AddStudentModal({ onClose, onAdded }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("children");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Введите имя ученика"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(STUDENTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", name, phone, group_type: group }),
      });
      if (res.ok) {
        onAdded();
      } else {
        setError("Ошибка добавления");
      }
    } catch {
      setError("Нет связи");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/15 rounded-3xl p-6 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <Icon name="X" size={20} />
        </button>

        <h3 className="text-xl font-black text-white mb-5">Новый ученик</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white/60 text-xs uppercase tracking-wide mb-2 block">Имя *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя ученика"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-pink-400 transition-colors [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="text-white/60 text-xs uppercase tracking-wide mb-2 block">Телефон родителя</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 000 000-00-00"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-pink-400 transition-colors [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="text-white/60 text-xs uppercase tracking-wide mb-2 block">Группа</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "children", label: "🧒 Детская" },
                { value: "adults", label: "🔥 Взрослая" },
              ].map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGroup(g.value)}
                  className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                    group === g.value
                      ? "bg-pink-500/20 border-pink-400 text-pink-300"
                      : "bg-white/5 border-white/15 text-white/60 hover:border-white/30"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-black uppercase tracking-wide py-3 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {loading ? "Добавляю..." : "Добавить ученика"}
          </button>
        </form>
      </div>
    </div>
  );
}