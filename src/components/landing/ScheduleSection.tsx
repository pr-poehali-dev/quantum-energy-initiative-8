import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const active = ["СР", "ПТ"];

export default function ScheduleSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-cyan-400 uppercase tracking-[0.2em] text-sm font-semibold mb-3">Когда тренируемся</div>
        <h2 className="text-4xl md:text-6xl font-black uppercase">
          Расписание{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            тренировок
          </span>
        </h2>
      </div>

      <div className="space-y-4 mb-10">
        {[
          {
            day: "Среда", short: "СР",
            slots: [{ group: "Детская группа", time: "16:00 – 17:00", color: "text-pink-400", dot: "bg-pink-400" }],
          },
          {
            day: "Пятница", short: "ПТ",
            slots: [
              { group: "Детская группа", time: "16:00 – 17:00", color: "text-pink-400", dot: "bg-pink-400" },
              { group: "Взрослая группа (18+)", time: "19:00 – 20:00", color: "text-cyan-400", dot: "bg-cyan-400" },
            ],
          },
        ].map((d, i) => (
          <motion.div
            key={d.day}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white/4 border border-white/10 rounded-2xl p-6 flex gap-5 items-start hover:border-white/20 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/30 to-orange-500/20 border border-pink-500/25 flex items-center justify-center shrink-0">
              <span className="font-black text-pink-300 text-base">{d.short}</span>
            </div>
            <div className="flex-1">
              <div className="font-black text-white text-lg mb-3">{d.day}</div>
              <div className="space-y-2">
                {d.slots.map((s) => (
                  <div key={s.group} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className={`w-2 h-2 rounded-full ${s.dot} shrink-0`} />
                    <span className={`font-semibold text-sm ${s.color}`}>{s.group}</span>
                    <span className="text-white/40 text-sm ml-auto flex items-center gap-1.5">
                      <Icon name="Clock" size={12} />
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini week */}
      <div className="bg-white/4 border border-white/10 rounded-2xl p-5 mb-4">
        <p className="text-white/30 text-xs uppercase tracking-wide mb-3 font-semibold">Дни недели</p>
        <div className="grid grid-cols-7 gap-2">
          {week.map((d) => {
            const on = active.includes(d);
            return (
              <div key={d} className={`aspect-square rounded-xl flex items-center justify-center text-xs font-black ${on ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-md shadow-pink-500/30 scale-110" : "bg-white/5 text-white/25"}`}>
                {d}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
        <Icon name="Info" size={15} className="text-orange-400 shrink-0 mt-0.5" />
        <p className="text-white/55 text-sm">
          Индивидуальные тренировки — по согласованию.{" "}
          Свяжитесь с менеджером Яной: <a href="tel:+79934813221" className="text-white font-semibold hover:text-orange-300 transition-colors">+7 993 481-32-21</a>
        </p>
      </div>
    </div>
  );
}
