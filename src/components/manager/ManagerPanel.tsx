import { useState } from "react";
import Icon from "@/components/ui/icon";
import StudentsList from "@/components/manager/StudentsList";
import TrialRequests from "@/components/manager/TrialRequests";
import AddStudentModal from "@/components/manager/AddStudentModal";

interface Props {
  onBack: () => void;
}

type Tab = "students" | "trials";

export default function ManagerPanel({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>("students");
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="bg-[#111] border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Icon name="ArrowLeft" size={16} />
              На сайт
            </button>
            <div className="w-px h-5 bg-white/20" />
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/bucket/6f3a3838-c4da-4702-af3a-e152494f4ef3.jpg"
                alt="Curly Dancing"
                className="h-8 w-auto"
              />
              <span className="font-black uppercase text-sm tracking-wide text-white/80">Панель менеджера</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/50 text-xs">Менеджер</div>
            <div className="font-semibold text-sm">Яна</div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#111] border-b border-white/10 px-6">
        <div className="max-w-6xl mx-auto flex gap-0">
          {[
            { id: "students" as Tab, label: "Ученики и посещения", icon: "Users" },
            { id: "trials" as Tab, label: "Заявки на пробное", icon: "ClipboardList" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all ${
                tab === t.id
                  ? "border-pink-400 text-pink-400"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {tab === "students" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-black uppercase">Ученики</h1>
              <button
                onClick={() => setShowAddStudent(true)}
                className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold uppercase tracking-wide px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Icon name="UserPlus" size={16} />
                Добавить ученика
              </button>
            </div>
            <StudentsList key={refreshKey} />
          </>
        )}
        {tab === "trials" && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-black uppercase">Заявки на пробное занятие</h1>
              <p className="text-white/50 text-sm mt-1">Новые заявки с сайта · 400 ₽ за пробное</p>
            </div>
            <TrialRequests key={refreshKey} />
          </>
        )}
      </main>

      {showAddStudent && (
        <AddStudentModal
          onClose={() => setShowAddStudent(false)}
          onAdded={() => { setShowAddStudent(false); refresh(); }}
        />
      )}
    </div>
  );
}
