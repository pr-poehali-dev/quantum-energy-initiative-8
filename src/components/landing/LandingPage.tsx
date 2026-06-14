import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Icon from "@/components/ui/icon";
import TrialForm from "@/components/landing/TrialForm";
import PricesSection from "@/components/landing/PricesSection";
import ScheduleSection from "@/components/landing/ScheduleSection";
import WhySection from "@/components/landing/WhySection";

interface Props {
  onManagerClick: () => void;
}

const HERO_IMG = "https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/files/0119a410-388b-4fca-b999-00243082ed89.jpg";

export default function LandingPage({ onManagerClick }: Props) {
  const [showTrialForm, setShowTrialForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#080808]/95 backdrop-blur-md shadow-lg shadow-black/50" : "bg-transparent"}`}>
        <div className="flex justify-between items-center px-6 md:px-10 py-4">
          <img
            src="https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/bucket/6f3a3838-c4da-4702-af3a-e152494f4ef3.jpg"
            alt="Curly Dancing"
            className="h-11 w-auto"
          />
          <nav className="hidden md:flex items-center gap-8">
            {[["#why", "О нас"], ["#schedule", "Расписание"], ["#prices", "Цены"], ["#contact", "Контакты"]].map(([href, label]) => (
              <a key={href} href={href} className="text-xs uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300 font-semibold">{label}</a>
            ))}
            <button
              onClick={() => setShowTrialForm(true)}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full hover:scale-105 transition-transform"
            >
              Пробное — 400 ₽
            </button>
          </nav>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0f0f0f] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
            {[["#why", "О нас"], ["#schedule", "Расписание"], ["#prices", "Цены"], ["#contact", "Контакты"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-wide text-white/70 font-semibold">{label}</a>
            ))}
            <button
              onClick={() => { setShowTrialForm(true); setMenuOpen(false); }}
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-black uppercase tracking-wide py-3 rounded-full"
            >
              Пробное занятие — 400 ₽
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={HERO_IMG} alt="Hip-hop dancer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-[#080808]/20 to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/30" />
        </motion.div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 mb-8 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              Зеленогорск · Хип-хоп студия
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tight mb-6 uppercase"
          >
            <span className="block text-white">Curly</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300">Dancing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-white/70 max-w-lg mx-auto mb-12 leading-relaxed"
          >
            Хип-хоп — это больше, чем танец.<br />
            Это характер, энергия и свобода движения.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setShowTrialForm(true)}
              className="group relative bg-gradient-to-r from-pink-500 to-orange-400 text-white font-black uppercase tracking-wide px-10 py-5 rounded-2xl text-base overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg shadow-pink-500/30"
            >
              <span className="relative z-10">Попробовать — 400 ₽ →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <a
              href="#why"
              className="border-2 border-white/30 text-white font-bold uppercase tracking-wide px-10 py-5 rounded-2xl text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Узнать больше
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Листай вниз</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <Icon name="ChevronDown" size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* TICKER */}
      <div className="bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-400 overflow-hidden py-3">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex gap-0 whitespace-nowrap"
        >
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="text-black font-black uppercase tracking-widest text-sm px-8">
              Hip-Hop &nbsp;·&nbsp; Детская группа &nbsp;·&nbsp; Взрослая 18+ &nbsp;·&nbsp; Зеленогорск &nbsp;·&nbsp; Кудрявый тренер &nbsp;·&nbsp; Пробное 400₽ &nbsp;·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* О НАС */}
      <section id="why" className="py-28 px-6">
        <WhySection />
      </section>

      {/* РАСПИСАНИЕ */}
      <section id="schedule" className="py-28 px-6 bg-[#0d0d0d]">
        <ScheduleSection />
      </section>

      {/* ЦЕНЫ */}
      <section id="prices" className="py-28 px-6">
        <PricesSection onTrial={() => setShowTrialForm(true)} />
      </section>

      {/* КОНТАКТЫ */}
      <section id="contact" className="py-28 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-pink-400 uppercase tracking-[0.2em] text-sm font-semibold mb-3">Связь</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase">
              Мы на{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">связи</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-md mx-auto">Пишите или звоните Яне — менеджеру студии. Ответим в любом удобном мессенджере.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Контакты менеджера */}
            <div className="bg-white/4 border border-white/10 rounded-2xl p-7">
              <h3 className="font-black text-white text-lg mb-5">📞 Яна — менеджер</h3>
              <div className="space-y-3">
                <a href="tel:+79934813221" className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/20 flex items-center justify-center shrink-0">
                    <Icon name="Phone" size={16} className="text-pink-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">Телефон / WhatsApp</div>
                    <div className="text-white font-semibold group-hover:text-pink-300 transition-colors">+7 993 481-32-21</div>
                  </div>
                </a>
                <a href="https://t.me/+79934813221" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Icon name="Send" size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">Telegram</div>
                    <div className="text-white font-semibold group-hover:text-cyan-300 transition-colors">Написать в Telegram</div>
                  </div>
                </a>
                <a href="https://vk.com/shopenman" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Icon name="Globe" size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">ВКонтакте</div>
                    <div className="text-white font-semibold group-hover:text-blue-300 transition-colors">vk.com/shopenman</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Адрес + QR */}
            <div className="space-y-4">
              <div className="bg-white/4 border border-white/10 rounded-2xl p-7">
                <h3 className="font-black text-white text-lg mb-4">📍 Студия</h3>
                <div className="text-white/70 leading-relaxed">
                  <div className="text-white font-semibold text-base">г. Зеленогорск</div>
                  <div>пер. Речной, д. 4, 2 этаж</div>
                </div>
              </div>
              <div className="bg-white/4 border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-3">
                <div className="bg-white rounded-2xl p-3">
                  <img
                    src="https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/bucket/635f07d0-9d30-4e9b-a693-a6cbf6dc361b.jpg"
                    alt="QR Telegram тренера Павла"
                    className="w-40 h-40 object-contain rounded-xl"
                  />
                </div>
                <p className="text-white/40 text-xs text-center">Telegram-канал тренера Павла<br />@shopendance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080808] border-t border-white/8 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img
            src="https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/bucket/6f3a3838-c4da-4702-af3a-e152494f4ef3.jpg"
            alt="Curly Dancing"
            className="h-9 w-auto opacity-60"
          />
          <p className="text-white/20 text-sm">{new Date().getFullYear()} Curly Dancing · Зеленогорск</p>
          <button
            onClick={onManagerClick}
            className="text-white/15 hover:text-white/40 transition-colors text-xs flex items-center gap-1.5"
          >
            <Icon name="Lock" size={11} />
            Вход для менеджера
          </button>
        </div>
      </footer>

      {showTrialForm && <TrialForm onClose={() => setShowTrialForm(false)} />}
    </div>
  );
}
