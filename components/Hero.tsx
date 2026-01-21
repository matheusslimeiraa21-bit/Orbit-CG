
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-14 min-h-[90vh] flex flex-col items-center justify-center text-center bg-black px-6">
      <div className="max-w-4xl z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-[#b09975] mb-8 block">Estética Atemporal</span>
        <h2 className="text-[52px] md:text-[86px] font-semibold tracking-tight leading-[0.95] text-white mb-10">
          Matte & Silver.<br/>
          <span className="font-light italic text-white/40">A nova órbita.</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-white text-black px-12 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 apple-transition shadow-2xl shadow-white/5">
            Descobrir Peças
          </button>
          <button className="text-white text-[11px] font-bold uppercase tracking-widest border-b-2 border-white/20 pb-1 hover:border-white apple-transition">
            Explore o Design
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none opacity-10">
        <span className="text-[80px] font-bold tracking-tighter text-white">01</span>
        <span className="text-[10px] font-bold uppercase tracking-widest rotate-90 origin-right text-white">Atelier ÓrbitaCG</span>
      </div>
    </section>
  );
};

export default Hero;
