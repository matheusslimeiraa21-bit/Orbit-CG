
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClear: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onClear }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onClear();
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-sm bg-[#0a0a0a] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/10">
        
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in-95">
            <div className="w-24 h-24 bg-[#b09975] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#b09975]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h2 className="text-[28px] font-semibold text-white mb-4">Pedido Realizado</h2>
            <p className="text-white/40 text-[14px]">Sua curadoria ÓrbitaCG já está sendo preparada.</p>
          </div>
        ) : (
          <>
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <h2 className="text-[20px] font-semibold text-white tracking-tight">Sua Sacola</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full apple-transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-32 opacity-20">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">Nenhum item selecionado</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-[#111111] p-6 rounded-[32px] border border-white/5 group">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-[20px] object-cover" />
                    <div className="flex-grow">
                      <h4 className="text-[14px] font-bold text-white">{item.name}</h4>
                      <p className="text-[12px] text-[#b09975] mb-4">R$ {item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-4">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-xs text-white hover:bg-white hover:text-black transition-colors">-</button>
                        <span className="text-[12px] font-bold text-white">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-xs text-white hover:bg-white hover:text-black transition-colors">+</button>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-white apple-transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-black space-y-6 border-t border-white/10">
                <div className="flex justify-between text-[18px] font-semibold text-white">
                  <span>Subtotal</span>
                  <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#b09975] hover:text-white apple-transition shadow-xl shadow-white/5"
                >
                  Finalizar Pedido
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
