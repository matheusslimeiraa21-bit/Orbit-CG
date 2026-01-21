
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white rounded-[48px] p-8 apple-transition matte-card flex flex-col items-center text-center relative">
      <div className="relative w-full aspect-square mb-10 overflow-hidden rounded-[40px] bg-[#f9f8f6]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
        />
        <button 
          onClick={copyLink}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
        >
          {copied ? (
            <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest px-2">Copiado</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          )}
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 px-4 py-1.5 rounded-full text-[9px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {product.category}
        </div>
      </div>
      <div className="w-full px-2">
        <h3 className="text-[22px] font-semibold text-[#1a1a1a] tracking-tight mb-2">{product.name}</h3>
        <p className="text-[14px] text-[#1a1a1a]/40 font-light leading-relaxed mb-8 line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-medium text-[#1a1a1a]">R$ {product.price.toFixed(0)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#b09975] apple-transition"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
