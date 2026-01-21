
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenProfile }) => {
  return (
    <nav className="fixed top-0 z-50 w-full opaque-nav h-14 flex items-center px-6 md:px-12 justify-between apple-transition">
      <div className="flex items-center gap-10">
        <div className="flex flex-col">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[17px] font-semibold tracking-tighter text-white hover:opacity-50 apple-transition leading-none">
            ÓrbitaCG
          </button>
          <span className="text-[7px] uppercase tracking-[0.3em] text-[#b09975] font-bold mt-1">Digital Flagship</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold text-white/40 uppercase tracking-[0.25em]">
          <a href="#catalog" className="hover:text-white apple-transition">Acervo</a>
          <a href="#" className="hover:text-white apple-transition">Atelier</a>
          <a href="#" className="hover:text-white apple-transition">Vender</a>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={onOpenProfile}
          className="p-1 text-white/60 hover:text-white apple-transition"
          aria-label="Perfil"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        <button 
          onClick={onOpenCart}
          className="relative group flex items-center gap-2 p-1 text-white/60 hover:text-white apple-transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {cartCount > 0 && (
            <span className="bg-[#b09975] text-white text-[8px] min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold absolute -top-1 -right-1">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
