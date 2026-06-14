import { motion } from "framer-motion";

interface Props {
  onTrial: () => void;
}

const KIDS_IMG = "https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/files/90f4d814-5e99-4107-91a7-72226bf42d29.jpg";
const ADULTS_IMG = "https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/files/eb2b54f5-8193-4a09-9f5a-f486d171860d.jpg";

const perks = [
  { icon: "🔥", title: "Живая атмосфера", desc: "Тренировки — это не урок, это событие. Музыка, движение, кайф." },
  { icon: "🎯", title: "Тренер Павел", desc: "Профессионал с душой. Найдёт подход к каждому — от малыша до взрослого." },
  { icon: "👨‍👩‍👧", title: "Для всей семьи", desc: "Детская и взрослая группы. Приходите вместе — есть семейные абонементы." },
  { icon: "🏙️", title: "Своя студия", desc: "Зеленогорск, пер. Речной, 4. Удобно добраться, просторный зал." },
];

export default function WhySection({ onTrial }: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <div className="text-pink-400 uppercase tracking-[0.2em] text-sm font-semibold mb-3">Почему выбирают нас</div>
        <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">
          Не просто<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300">
            танцы
          </span>
        </h2>
      </div>

      {/* Perks grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
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

      {/* Two groups */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Дети */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden group cursor-pointer"
          onClick={onTrial}
        >
          <img src={KIDS_IMG} alt="Детская группа" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <div className="text-pink-400 text-xs uppercase tracking-[0.2em] font-bold mb-2">🧒 Для детей</div>
            <h3 className="text-2xl font-black text-white mb-1">Детская группа</h3>
            <p className="text-white/60 text-sm mb-4">Ср / Пт · 16:00 – 17:00</p>
            <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/40 rounded-full px-4 py-2 text-pink-300 text-sm font-semibold group-hover:bg-pink-500/40 transition-colors">
              Записаться на пробное →
            </div>
          </div>
        </motion.div>

        {/* Взрослые */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden group cursor-pointer"
          onClick={onTrial}
        >
          <img src={ADULTS_IMG} alt="Взрослая группа" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <div className="text-cyan-400 text-xs uppercase tracking-[0.2em] font-bold mb-2">🔥 18+</div>
            <h3 className="text-2xl font-black text-white mb-1">Взрослая группа</h3>
            <p className="text-white/60 text-sm mb-4">Пт · 19:00 – 20:00</p>
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/40 rounded-full px-4 py-2 text-cyan-300 text-sm font-semibold group-hover:bg-cyan-500/40 transition-colors">
              Записаться на пробное →
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
