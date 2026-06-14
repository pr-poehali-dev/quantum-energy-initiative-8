import { motion } from "framer-motion";

interface Props {
  onTrial: () => void;
}

const groups = [
  {
    title: "Групповые",
    emoji: "👥",
    color: "from-pink-500/15 to-pink-500/5",
    border: "border-pink-500/20",
    accent: "text-pink-400",
    items: [
      { label: "Разовое занятие", price: "700 ₽" },
      { label: "4 тренировки", price: "2 600 ₽" },
      { label: "6 тренировок", price: "3 800 ₽" },
      { label: "8 тренировок (месяц)", price: "5 000 ₽" },
    ],
  },
  {
    title: "Семейные",
    emoji: "👨‍👩‍👧",
    color: "from-orange-500/15 to-orange-500/5",
    border: "border-orange-500/20",
    accent: "text-orange-400",
    sub: "На 2 человека",
    items: [
      { label: "12 занятий (на двоих)", price: "7 200 ₽" },
      { label: "16 занятий (на двоих)", price: "9 200 ₽" },
    ],
  },
  {
    title: "Индивидуальные",
    emoji: "🎯",
    color: "from-cyan-500/15 to-cyan-500/5",
    border: "border-cyan-500/20",
    accent: "text-cyan-400",
    items: [
      { label: "Разовое занятие", price: "2 000 ₽" },
      { label: "4 тренировки", price: "7 000 ₽" },
      { label: "8 тренировок (месяц)", price: "12 000 ₽" },
    ],
  },
];

export default function PricesSection({ onTrial }: Props) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-orange-400 uppercase tracking-[0.2em] text-sm font-semibold mb-3">Абонементы</div>
        <h2 className="text-4xl md:text-6xl font-black uppercase">
          Честные <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">цены</span>
        </h2>
        <p className="text-white/40 mt-4 text-base">Для детей и взрослых. Танцуем вместе!</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`bg-gradient-to-b ${g.color} border ${g.border} rounded-2xl p-7`}
          >
            <div className="text-3xl mb-3">{g.emoji}</div>
            <h3 className={`font-black text-xl uppercase mb-1 ${g.accent}`}>{g.title}</h3>
            {g.sub && <p className="text-white/40 text-xs mb-4">{g.sub}</p>}
            <div className="space-y-3 mt-5">
              {g.items.map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2.5 border-b border-white/8 last:border-0">
                  <span className="text-white/60 text-sm">{item.label}</span>
                  <span className="text-white font-black text-base">{item.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-600/30 to-orange-500/30 border border-pink-500/30 rounded-3xl p-8 text-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Пробное занятие — 400 ₽</h3>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Купишь абонемент после пробного — оно становится бесплатным. Никаких рисков!
          </p>
          <button
            onClick={onTrial}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-black uppercase tracking-wide px-10 py-4 rounded-xl hover:scale-105 transition-transform text-sm shadow-lg shadow-pink-500/30"
          >
            Записаться прямо сейчас
          </button>
        </div>
      </motion.div>
    </div>
  );
}
