
import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import GeminiAdvisor from './components/GeminiAdvisor';
import Profile from './components/Profile';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('orbitacg_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('orbitacg_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('orbitacg_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orbitacg_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const addNewProduct = useCallback((newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setIsProfileOpen(false);
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-[#b09975] selection:text-white">
      <Navbar 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenProfile={() => setIsProfileOpen(true)}
      />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="catalog" className="max-w-7xl mx-auto px-6 py-48 bg-black">
          <div className="flex flex-col items-center mb-32">
            <h2 className="text-[48px] md:text-[72px] font-semibold tracking-tight text-white mb-12">Curadoria ÓrbitaCG.</h2>
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide w-full justify-center">
              {['Signature', 'Marketplace', 'Anéis', 'Brincos'].map((cat) => (
                <button 
                  key={cat}
                  className="px-12 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black apple-transition flex-shrink-0"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-56 rounded-t-[100px] border-t border-white/5">
          <div className="max-w-6xl mx-auto px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <span className="text-[10px] font-bold text-[#b09975] uppercase tracking-[0.5em]">Atelier Hub</span>
                <h2 className="text-[42px] md:text-[56px] font-semibold tracking-tight text-white leading-tight">Venda, compre, orbite.</h2>
                <p className="text-[18px] text-white/40 font-light leading-relaxed max-w-md">Nossa plataforma de revenda garante que peças de luxo continuem brilhando em novos horizontes.</p>
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="text-[12px] font-bold uppercase tracking-widest border-b-2 border-white/20 text-white pb-2 hover:border-white transition-all"
                >
                  Começar a Vender
                </button>
              </div>
              <div className="bg-[#111111] aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl border border-white/5">
                <img src="https://picsum.photos/seed/orbita-market/800/1000" className="w-full h-full object-cover grayscale opacity-60" alt="Marketplace" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-40 px-10 rounded-t-[100px] border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
          <div className="max-w-sm">
            <h2 className="text-[32px] font-semibold tracking-tighter mb-4">ÓrbitaCG</h2>
            <p className="text-[10px] text-[#b09975] font-bold uppercase tracking-[0.4em] mb-10">Digital Flagship Store</p>
            <div className="space-y-2 text-[13px] text-white/30 font-light mb-12">
              <p>Av. Europa, 1024 — Jardins</p>
              <p>São Paulo, SP — Brasil</p>
              <p className="pt-4 text-white/60 font-medium">www.orbitacg.com.br</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-32">
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#b09975]">Marketplace</h4>
              <ul className="space-y-4 text-[14px] text-white/20 font-light">
                <li><a href="#" onClick={() => setIsProfileOpen(true)} className="hover:text-white transition-colors">Vender Joia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Revenda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Autenticação</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#b09975]">Contato</h4>
              <ul className="space-y-4 text-[14px] text-white/20 font-light">
                <li><a href="#" className="hover:text-white transition-colors">Atendimento</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-40 pt-16 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/10 font-medium uppercase tracking-[0.5em]">
            &copy; {new Date().getFullYear()} ÓrbitaCG Fine Jewelry. All Rights Reserved.
          </p>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClear={clearCart}
      />

      <Profile 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onAddProduct={addNewProduct}
      />
      
      <GeminiAdvisor products={products} />
    </div>
  );
};

export default App;
