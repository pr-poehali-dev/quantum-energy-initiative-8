import { motion } from "framer-motion";

const TRAINER_PHOTO = "https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/bucket/f8ded92e-512d-4014-a4b6-a3edf1eaf86a.jpg";

const achievements = [
  { year: "2024", event: "Odd Battle", place: "Semi-Finalist Hip-Hop Pro", city: "Москва" },
  { year: "2025", event: "Klukva Battle", place: "Semi-Finalist All Styles Pro", city: "" },
  { year: "2022", event: "KLTR Battle", place: "🥇 1 место Hip-Hop 1x1", city: "Минск" },
  { year: "2018", event: "SPB Flow Jam", place: "🥇 1 место Hip-Hop 1x1", city: "Санкт-Петербург" },
  { year: "2017", event: "Underground Pulse", place: "🥇 1 место Hip-Hop 1x1", city: "Санкт-Петербург" },
  { year: "2017", event: "Vitebsk Street Flow", place: "🥇 1 место Hip-Hop 1x1", city: "Беларусь" },
  { year: "2016", event: "Nevsky Vibe", place: "🥈 2 место Hip-Hop 1x1", city: "Санкт-Петербург" },
  { year: "2015", event: "Groove Republic", place: "🥈 2 место Hip-Hop 1x1", city: "Минск" },
];

export default function TrainerSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-orange-400 uppercase tracking-[0.2em] text-sm font-semibold mb-3">Ваш тренер</div>
        <h2 className="text-4xl md:text-6xl font-black uppercase">
          Кто тебя{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
            научит
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* Фото + имя */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={TRAINER_PHOTO}
              alt="Павел Кудрявый — тренер по хип-хопу"
              className="w-full object-cover object-top"
              style={{ maxHeight: "520px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="text-orange-400 text-xs uppercase tracking-[0.2em] font-bold mb-1">Тренер · Хореограф</div>
              <h3 className="text-3xl font-black text-white leading-tight">
                Павел<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">«Кудрявый»</span>
              </h3>
            </div>
          </div>

          {/* Бейдж опыта */}
          <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-sm border border-orange-400/40 rounded-2xl px-4 py-3 text-center">
            <div className="text-orange-400 font-black text-2xl leading-none">10+</div>
            <div className="text-white/60 text-xs mt-0.5">лет опыта</div>
          </div>
        </motion.div>

        {/* Инфо */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* О себе */}
          <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
            <p className="text-white/75 leading-relaxed text-base">
              Танцор, хореограф и педагог с более чем 10-летним опытом в уличных стилях. Призёр и финалист баттлов в России и Беларуси, специализируется на <span className="text-orange-300 font-semibold">Hip-Hop</span>.
            </p>
            <p className="text-white/60 leading-relaxed text-sm mt-3">
              Автор номеров, тренер групп разного уровня и ментор в развитии фристайла и сценического образа. В работе делает акцент на <span className="text-white/90">музыкальность, технику и индивидуальность</span>.
            </p>
          </div>

          {/* Достижения */}
          <div>
            <div className="text-white/40 text-xs uppercase tracking-wide font-semibold mb-3 flex items-center gap-2">
              <span className="text-lg">🏆</span> Баттлы и соревнования
            </div>
            <div className="space-y-2">
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5"
                >
                  <span className="text-white/30 text-xs font-bold w-8 shrink-0">{a.year}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-semibold text-sm">{a.event}</span>
                    {a.city && <span className="text-white/35 text-xs ml-2">· {a.city}</span>}
                  </div>
                  <span className="text-white/70 text-xs text-right shrink-0">{a.place}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
