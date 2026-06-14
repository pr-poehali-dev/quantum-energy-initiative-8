import { useState } from "react";
import Icon from "@/components/ui/icon";

const PASSWORD = "curly2024";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

export default function ManagerLogin({ onSuccess, onBack }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      {/* Фоновые блики */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm mb-8"
        >
          <Icon name="ArrowLeft" size={14} />
          На сайт
        </button>

        <div className="bg-white/4 border border-white/10 rounded-3xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/bucket/6f3a3838-c4da-4702-af3a-e152494f4ef3.jpg"
              alt="Curly Dancing"
              className="h-14 w-auto"
            />
          </div>

          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-3 py-1.5 mb-4">
              <Icon name="Lock" size={12} className="text-pink-400" />
              <span className="text-pink-400 text-xs font-semibold uppercase tracking-wide">Только для менеджера</span>
            </div>
            <h1 className="text-xl font-black text-white">Панель управления</h1>
            <p className="text-white/40 text-sm mt-1">Введите пароль для входа</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                autoFocus
                className={`w-full bg-white/8 border rounded-xl px-4 py-3.5 pr-12 text-white placeholder-white/25 focus:outline-none transition-colors ${
                  error
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/15 focus:border-pink-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <Icon name={show ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
                <Icon name="AlertCircle" size={14} />
                Неверный пароль
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-black uppercase tracking-wide py-3.5 rounded-xl hover:scale-[1.02] transition-transform text-sm shadow-lg shadow-pink-500/20"
            >
              Войти
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-5">
          Curly Dancing · Панель менеджера Яны
        </p>
      </div>
    </div>
  );
}
