import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const TRIAL_URL = "https://functions.poehali.dev/afe7df7a-7d0f-4270-911e-2afdb352deb8";

interface TrialRequest {
  id: number;
  name: string;
  phone: string;
  group_type: string;
  message: string;
  status: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "Новая", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  contacted: { label: "Связались", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  confirmed: { label: "Подтверждено", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  cancelled: { label: "Отменено", color: "bg-white/10 text-white/40 border-white/15" },
};

function formatDate(s: string) {
  const d = new Date(s);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function TrialRequests() {
  const [requests, setRequests] = useState<TrialRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(TRIAL_URL);
      const data = await res.json();
      setRequests(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(TRIAL_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchRequests();
  };

  const newCount = requests.filter((r) => r.status === "new").length;

  return (
    <div>
      {newCount > 0 && (
        <div className="bg-pink-500/15 border border-pink-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-black text-sm shrink-0">
            {newCount}
          </div>
          <div>
            <div className="font-semibold text-white text-sm">Новых заявок: {newCount}</div>
            <div className="text-white/50 text-xs">Позвоните и подтвердите время</div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-white/40">Загружаю...</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <div className="text-4xl mb-3">📋</div>
          <p>Заявок пока нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const st = STATUS_LABELS[req.status] || STATUS_LABELS.new;
            return (
              <div key={req.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-white text-lg">{req.name}</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${st.color}`}>
                        {st.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        req.group_type === "adults" ? "bg-cyan-500/20 text-cyan-400" : "bg-pink-500/20 text-pink-400"
                      }`}>
                        {req.group_type === "adults" ? "Взрослая" : "Детская"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <a href={`tel:${req.phone}`} className="flex items-center gap-2 text-white font-semibold hover:text-pink-400 transition-colors">
                        <Icon name="Phone" size={14} className="text-pink-400" />
                        {req.phone}
                      </a>
                      <span className="text-white/30 text-xs">{formatDate(req.created_at)}</span>
                    </div>
                    {req.message && (
                      <p className="text-white/50 text-sm mt-2 italic">«{req.message}»</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {["contacted", "confirmed", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(req.id, s)}
                      disabled={req.status === s}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all disabled:opacity-40 ${
                        req.status === s ? STATUS_LABELS[s]?.color : "bg-white/5 border-white/15 text-white/50 hover:bg-white/10"
                      }`}
                    >
                      {STATUS_LABELS[s]?.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
