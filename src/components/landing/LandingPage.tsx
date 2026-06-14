import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import TrialForm from "@/components/landing/TrialForm";
import PricesSection from "@/components/landing/PricesSection";
import ScheduleSection from "@/components/landing/ScheduleSection";

interface Props {
  onManagerClick: () => void;
}

export default function LandingPage({ onManagerClick }: Props) {
  const [showTrialForm, setShowTrialForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/10">
        <img
          src="https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/bucket/6f3a3838-c4da-4702-af3a-e152494f4ef3.jpg"
          alt="Curly Dancing"
          className="h-12 w-auto"
        />
        <nav className="flex items-center gap-6">
          <a href="#schedule" className="text-sm uppercase tracking-wide text-white/70 hover:text-white transition-colors">Расписание</a>
          <a href="#prices" className="text-sm uppercase tracking-wide text-white/70 hover:text-white transition-colors">Цены</a>
          <a href="#contact" className="text-sm uppercase tracking-wide text-white/70 hover:text-white transition-colors">Контакты</a>
          <button
            onClick={onManagerClick}
            className="text-xs uppercase tracking-wide text-white/40 hover:text-white/70 transition-colors border border-white/20 px-3 py-1 rounded"
          >
            Панель менеджера
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/mountain-landscape.jpg"
            alt="bg"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
        </div>

        {/* Colorful splashes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-pink-400 uppercase tracking-[0.3em] text-sm mb-4 font-medium">Зеленогорск · Хип-хоп</div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 leading-none">
              CURLY
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400">
                DANCING
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10">
              Тренировки по хип-хопу для детей и взрослых.<br />
              Тренер — <span className="text-white font-semibold">Павел</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowTrialForm(true)}
                className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold uppercase tracking-wide px-8 py-4 rounded-full hover:scale-105 transition-transform text-sm"
              >
                🎉 Записаться на пробное — 400 ₽
              </button>
              <a
                href="#prices"
                className="border border-white/30 text-white font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-sm"
              >
                Смотреть цены
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-24 px-6 bg-[#0f0f0f]">
        <ScheduleSection />
      </section>

      {/* Prices */}
      <section id="prices" className="py-24 px-6 bg-[#0a0a0a]">
        <PricesSection onTrial={() => setShowTrialForm(true)} />
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-12 text-center">
            Связь и{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
              контакты
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-pink-500/20 rounded-full p-3 shrink-0">
                  <Icon name="Phone" size={20} className="text-pink-400" />
                </div>
                <div>
                  <div className="text-white/50 text-sm uppercase tracking-wide mb-1">Менеджер Яна</div>
                  <a href="tel:+79934813221" className="text-xl font-bold text-white hover:text-pink-400 transition-colors">
                    +7 993 481-32-21
                  </a>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-cyan-500/20 rounded-full p-3 shrink-0">
                  <Icon name="Send" size={20} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-white/50 text-sm uppercase tracking-wide mb-1">Telegram тренера Павла</div>
                  <a href="https://t.me/shopendance" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
                    @shopendance
                  </a>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-orange-500/20 rounded-full p-3 shrink-0">
                  <Icon name="MapPin" size={20} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-white/50 text-sm uppercase tracking-wide mb-1">Адрес студии</div>
                  <div className="text-lg font-semibold text-white">г. Зеленогорск,<br />пер. Речной д. 4, 2 этаж</div>
                </div>
              </div>
            </div>

            {/* QR */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-3xl p-4 shadow-2xl">
                <img
                  src="https://cdn.poehali.dev/projects/4e5bf7be-695b-4f39-aa19-2bd9affbc58b/bucket/635f07d0-9d30-4e9b-a693-a6cbf6dc361b.jpg"
                  alt="QR Telegram @shopendance"
                  className="w-56 h-56 object-contain rounded-2xl"
                />
              </div>
              <p className="text-white/50 text-sm mt-4 text-center">Сканируй QR — подписывайся<br />на Telegram-канал тренера</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-8 px-6 text-center">
        <p className="text-white/30 text-sm">{new Date().getFullYear()} Curly Dancing · Зеленогорск</p>
      </footer>

      {/* Trial Form Modal */}
      {showTrialForm && (
        <TrialForm onClose={() => setShowTrialForm(false)} />
      )}
    </div>
  );
}
