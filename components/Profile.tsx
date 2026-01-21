
import React, { useState } from 'react';
import { User, Product } from '../types';
import { generateProductDescription } from '../services/geminiService';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showSellForm, setShowSellForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'anéis',
    description: ''
  });

  if (!isOpen) return null;

  const handleLogin = () => {
    setUser({
      id: 'u1',
      name: 'Alexandre Orbita',
      email: 'alexandre@orbita.br',
      isVendor: true
    });
  };

  const handleSellProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image: `https://picsum.photos/seed/${newProduct.name}/600/600`,
      category: newProduct.category as any,
      material: 'Prata 925',
      sellerId: user?.id
    };
    onAddProduct(product);
    setShowSellForm(false);
    setNewProduct({ name: '', price: '', category: 'anéis', description: '' });
  };

  const handleAIDescription = async () => {
    if (!newProduct.name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.category);
    setNewProduct(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-[#0a0a0a] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-y-auto border-l border-white/10">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/50">
          <h2 className="text-[20px] font-semibold text-white tracking-tight">Atelier Hub</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full apple-transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="p-8">
          {!user ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center space-y-2">
                <h3 className="text-[24px] font-semibold text-white">Inicie sua Órbita</h3>
                <p className="text-[14px] text-white/40">Entre para gerenciar suas compras e vendas.</p>
              </div>
              <div className="space-y-4">
                <input type="email" placeholder="Email" className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-white/30 text-white transition-all placeholder:text-white/20" />
                <input type="password" placeholder="Senha" className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-white/30 text-white transition-all placeholder:text-white/20" />
                <button onClick={handleLogin} className="w-full bg-white text-black py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-[#b09975] hover:text-white transition-all">
                  Entrar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-[#111111] rounded-full border border-white/10 flex items-center justify-center text-[24px] font-bold text-[#b09975]">
                  {user.name[0]}
                </div>
                <div>
                  <h3 className="text-[22px] font-semibold text-white">{user.name}</h3>
                  <p className="text-[14px] text-white/40">{user.email}</p>
                </div>
              </div>

              {!showSellForm ? (
                <div className="space-y-6">
                  <div className="bg-[#111111] p-10 rounded-[48px] border border-white/5 text-white space-y-6">
                    <h4 className="text-[20px] font-semibold">Venda suas Joias</h4>
                    <p className="text-[14px] text-white/40 leading-relaxed">Sua Prata 925 merece um novo destino. Anuncie agora.</p>
                    <button 
                      onClick={() => setShowSellForm(true)}
                      className="bg-[#b09975] text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all"
                    >
                      Anunciar Peça
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSellProduct} className="bg-[#111111] p-8 rounded-[48px] border border-white/5 space-y-6 animate-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-[16px] uppercase tracking-widest text-white">Nova Joia</h4>
                    <button type="button" onClick={() => setShowSellForm(false)} className="text-[12px] font-bold text-white/30">Cancelar</button>
                  </div>
                  
                  <div className="space-y-4">
                    <input required type="text" placeholder="Nome da Peça" value={newProduct.name} onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))} className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none text-white text-[14px] placeholder:text-white/20" />
                    <div className="flex gap-4">
                      <input required type="number" placeholder="Preço" value={newProduct.price} onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))} className="w-1/2 p-4 bg-black border border-white/10 rounded-2xl outline-none text-white text-[14px] placeholder:text-white/20" />
                      <select value={newProduct.category} onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))} className="w-1/2 p-4 bg-black border border-white/10 rounded-2xl outline-none text-white text-[14px]">
                        <option value="anéis">Anéis</option>
                        <option value="brincos">Brincos</option>
                        <option value="colares">Colares</option>
                        <option value="pulseiras">Pulseiras</option>
                      </select>
                    </div>
                    <textarea placeholder="Descrição..." rows={4} value={newProduct.description} onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))} className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none text-white text-[14px] resize-none placeholder:text-white/20" />
                    <button type="submit" className="w-full bg-white text-black py-4 rounded-full text-[11px] font-bold uppercase tracking-widest">Publicar</button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
