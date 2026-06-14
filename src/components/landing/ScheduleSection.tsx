import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

const days = [
  { day: "Среда", short: "СР", groups: [{ label: "Детская группа", time: "16:00 – 17:00", color: "text-pink-400", dot: "bg-pink-400" }] },
  { day: "Пятница", short: "ПТ", groups: [
    { label: "Детская группа", time: "16:00 – 17:00", color: "text-pink-400", dot: "bg-pink-400" },
    { label: "Взрослая группа (18+)", time: "19:00 – 20:00", color: "text-cyan-400", dot: "bg-cyan-400" },
  ] },
];

const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const active = ["СР", "ПТ"];

export default function ScheduleSection() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-cyan-400 uppercase tracking-[0.2em] text-sm font-semibold mb-3">Когда тренируемся</div>
        <h2 className="text-4xl md:text-6xl font-black uppercase">
          Расписание <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">тренировок</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {days.map((d, i) => (
          <motion.div
            key={d.day}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-white/4 border border-white/10 rounded-2xl p-7 hover:border-pink-500/30 transition-colors"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/30 to-orange-500/20 border border-pink-500/30 flex items-center justify-center">
                <span className="font-black text-pink-300 text-lg">{d.short}</span>
              </div>
              <div>
                <h3 className="font-black text-white text-xl">{d.day}</h3>
                <p className="text-white/40 text-sm">{d.groups.length} {d.groups.length === 1 ? "группа" : "группы"}</p>
              </div>
            </div>
            <div className="space-y-3">
              {d.groups.map((g) => (
                <div key={g.label} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                  <div className={`w-2 h-2 rounded-full ${g.dot} shrink-0`} />
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${g.color}`}>{g.label}</div>
                    <div className="text-white/50 text-xs mt-0.5">{g.time}</div>
                  </div>
                  <Icon name="Clock" size={14} className="text-white/25" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini-calendar */}
      <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
        <p className="text-white/40 text-xs uppercase tracking-wide mb-4 font-semibold">Тренировочные дни недели</p>
        <div className="grid grid-cols-7 gap-2">
          {week.map((d) => {
            const isActive = active.includes(d);
            return (
              <div
                key={d}
                className={`aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-lg shadow-pink-500/30 scale-110"
                    : "bg-white/5 text-white/25"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-white/40">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink-400 inline-block" /> Тренировка</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white/20 inline-block" /> Выходной</div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
        <div className="text-orange-400 shrink-0 mt-0.5"><Icon name="Info" size={16} /></div>
        <p className="text-white/60 text-sm">
          Индивидуальные тренировки — по согласованию с тренером.{" "}
          Звоните Яне: <a href="tel:+79934813221" className="text-white font-semibold hover:text-orange-300 transition-colors">+7 993 481-32-21</a>
        </p>
      </div>
    </div>
  );
}
