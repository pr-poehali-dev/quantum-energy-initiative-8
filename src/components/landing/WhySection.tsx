import { motion } from "framer-motion";

const perks = [
  { icon: "🔥", title: "Живая атмосфера", desc: "Тренировки — это не урок, это событие. Музыка, энергия, кайф от каждого движения." },
  { icon: "🎯", title: "Подход к каждому", desc: "Новичок или уже танцуешь? Неважно. Здесь найдут твой темп и раскроют потенциал." },
  { icon: "👨‍👩‍👧", title: "Для всей семьи", desc: "Детская и взрослая группы. Приходите вместе — есть семейные абонементы." },
  { icon: "🏙️", title: "Своя студия", desc: "Зеленогорск, пер. Речной, 4. Удобно добраться, просторный зал." },
];

const groups = [
  {
    emoji: "🧒",
    label: "Детская группа",
    accent: "from-pink-500/20 to-pink-500/5 border-pink-500/25",
    textAccent: "text-pink-400",
    desc: "Дети учатся чувствовать ритм, двигаться раскованно и получать удовольствие от танца.",
    days: "Среда и Пятница · 16:00 – 17:00",
  },
  {
    emoji: "🔥",
    label: "Взрослая группа 18+",
    accent: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/25",
    textAccent: "text-cyan-400",
    desc: "Хип-хоп для взрослых — сбросить стресс, найти себя в движении и зарядиться энергией.",
    days: "Пятница · 19:00 – 20:00",
  },
];

export default function WhySection() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <div className="text-pink-400 uppercase tracking-[0.2em] text-sm font-semibold mb-3">Почему выбирают нас</div>
        <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">
          Не просто{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300">
            танцы
          </span>
        </h2>
      </div>

      {/* Perks */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {perks.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white/4 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-pink-500/30 transition-all duration-300 group"
          >
            <div className="text-4xl mb-4">{p.icon}</div>
            <h3 className="font-black text-white text-lg mb-2 group-hover:text-pink-300 transition-colors">{p.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Groups */}
      <div className="grid md:grid-cols-2 gap-6">
        {groups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`bg-gradient-to-br ${g.accent} border rounded-2xl p-8`}
          >
            <div className="text-4xl mb-4">{g.emoji}</div>
            <h3 className={`font-black text-xl mb-3 ${g.textAccent}`}>{g.label}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{g.desc}</p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span>🕐</span>
              <span>{g.days}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
