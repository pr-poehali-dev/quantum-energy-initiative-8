import Icon from "@/components/ui/icon";

export default function ScheduleSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black uppercase mb-12 text-center">
        Расписание{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
          тренировок
        </span>
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Детская группа */}
        <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">🧒</div>
            <div>
              <h3 className="text-xl font-black uppercase text-pink-400">Детская группа</h3>
              <p className="text-white/50 text-sm">Для детей</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
              <Icon name="Calendar" size={18} className="text-pink-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">Среда</div>
                <div className="text-white/50 text-sm">16:00 – 17:00</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
              <Icon name="Calendar" size={18} className="text-pink-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">Пятница</div>
                <div className="text-white/50 text-sm">16:00 – 17:00</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-white/50 text-sm">
            <Icon name="Clock" size={14} />
            <span>2 раза в неделю · 1 час</span>
          </div>
        </div>

        {/* Взрослая группа */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">🔥</div>
            <div>
              <h3 className="text-xl font-black uppercase text-cyan-400">Взрослая группа</h3>
              <p className="text-white/50 text-sm">18+ лет</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
              <Icon name="Calendar" size={18} className="text-cyan-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">Пятница</div>
                <div className="text-white/50 text-sm">19:00 – 20:00</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-white/50 text-sm">
            <Icon name="Clock" size={14} />
            <span>1 раз в неделю · 1 час</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
        <div className="text-2xl shrink-0">📍</div>
        <div>
          <div className="font-semibold text-white mb-1">г. Зеленогорск, пер. Речной д. 4, второй этаж</div>
          <div className="text-white/50 text-sm">Тренер — Павел. По всем вопросам: Яна +7 993 481-32-21</div>
        </div>
      </div>
    </div>
  );
}
