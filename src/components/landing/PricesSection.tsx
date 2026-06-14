interface Props {
  onTrial: () => void;
}

export default function PricesSection({ onTrial }: Props) {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
          Цены
        </span>
      </h2>
      <p className="text-white/50 text-center mb-12">Для детей и взрослых 🔥 Танцуем вместе!</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Групповые */}
        <div className="bg-gradient-to-b from-white/8 to-white/3 border border-white/15 rounded-2xl p-6">
          <h3 className="text-lg font-black uppercase text-pink-400 mb-5">👥 Групповые</h3>
          <div className="space-y-3">
            {[
              { label: "Разовое занятие", price: "700 ₽" },
              { label: "4 тренировки (полмесяца)", price: "2 600 ₽" },
              { label: "6 тренировок", price: "3 800 ₽" },
              { label: "8 тренировок (месяц)", price: "5 000 ₽" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/8 last:border-0">
                <span className="text-white/70 text-sm">{item.label}</span>
                <span className="text-white font-bold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Семейные */}
        <div className="bg-gradient-to-b from-orange-500/15 to-orange-500/5 border border-orange-500/30 rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-black text-xs font-black uppercase px-3 py-1 rounded-full">
            Популярное
          </div>
          <h3 className="text-lg font-black uppercase text-orange-400 mb-5">👨‍👩‍👧 Семейные</h3>
          <p className="text-white/50 text-xs mb-4">На 2 человека</p>
          <div className="space-y-3">
            {[
              { label: "12 занятий (на двоих)", price: "7 200 ₽" },
              { label: "16 занятий (на двоих)", price: "9 200 ₽" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/8 last:border-0">
                <span className="text-white/70 text-sm">{item.label}</span>
                <span className="text-white font-bold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Индивидуальные */}
        <div className="bg-gradient-to-b from-white/8 to-white/3 border border-white/15 rounded-2xl p-6">
          <h3 className="text-lg font-black uppercase text-cyan-400 mb-5">🎯 Индивидуальные</h3>
          <div className="space-y-3">
            {[
              { label: "Разовое занятие", price: "2 000 ₽" },
              { label: "4 тренировки (полмесяца)", price: "7 000 ₽" },
              { label: "8 тренировок (месяц)", price: "12 000 ₽" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/8 last:border-0">
                <span className="text-white/70 text-sm">{item.label}</span>
                <span className="text-white font-bold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Акция */}
      <div className="bg-gradient-to-r from-pink-500/20 to-orange-400/20 border border-pink-400/40 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-xl font-black text-white mb-2">Пробное занятие — всего 400 ₽!</h3>
        <p className="text-white/60 text-sm mb-5">
          Если после пробного занятия вы берёте абонемент — пробное становится бесплатным!
        </p>
        <button
          onClick={onTrial}
          className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-black uppercase tracking-wide px-8 py-3 rounded-full hover:scale-105 transition-transform text-sm"
        >
          Записаться на пробное
        </button>
      </div>
    </div>
  );
}
