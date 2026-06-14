import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onClose: () => void;
}

const TRIAL_URL = "https://functions.poehali.dev/afe7df7a-7d0f-4270-911e-2afdb352deb8";

export default function TrialForm({ onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("children");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) { setError("Заполните имя и телефон"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(TRIAL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, group_type: group }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError("Ошибка отправки. Позвоните Яне: +7 993 481-32-21");
      }
    } catch {
      setError("Нет связи. Позвоните Яне: +7 993 481-32-21");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/15 rounded-3xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <Icon name="X" size={20} />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-black text-white mb-3">Заявка принята!</h3>
            <p className="text-white/60 mb-2">Яна свяжется с вами для подтверждения.</p>
            <p className="text-white/50 text-sm mb-6">Пробное занятие — 400 ₽ (если купите абонемент — бесплатно!)</p>
            <button onClick={onClose} className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold uppercase px-6 py-3 rounded-full text-sm">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-black text-white mb-1">Пробное занятие</h3>
            <p className="text-white/50 text-sm mb-6">400 ₽ · Яна перезвонит и подтвердит время</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/60 text-xs uppercase tracking-wide mb-2 block">Ваше имя *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя ребёнка или ваше"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-pink-400 transition-colors [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="text-white/60 text-xs uppercase tracking-wide mb-2 block">Телефон *</label>
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
                    { value: "adults", label: "🔥 Взрослая (18+)" },
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
                className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-black uppercase tracking-wide py-4 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
              >
                {loading ? "Отправляю..." : "Записаться на пробное"}
              </button>

              <p className="text-center text-white/30 text-xs">
                Или позвоните Яне: <a href="tel:+79934813221" className="text-white/50 hover:text-white">+7 993 481-32-21</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}