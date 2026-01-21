
import React, { useState, useRef, useEffect } from 'react';
import { Message, Product } from '../types';
import { getJewelryAdvice } from '../services/geminiService';
import { GoogleGenAI, Modality } from '@google/genai';

interface GeminiAdvisorProps {
  products: Product[];
}

const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bem-vindo ao Atelier ÓrbitaCG. Como posso guiar sua busca pela joia ideal?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageToSend = text || input;
    if (!messageToSend.trim() || isLoading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);
    
    const aiResponse = await getJewelryAdvice(messageToSend, products);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  // Mock Voice Interaction for demo purposes
  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        handleSend("Gostaria de ver anéis minimalistas");
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      {isOpen ? (
        <div className="bg-[#1a1a1a] w-[340px] md:w-[400px] h-[600px] shadow-2xl rounded-[40px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500 border border-white/5">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div>
              <p className="text-white text-[12px] font-bold uppercase tracking-[0.3em]">Concierge ÓrbitaCG</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <p className="text-[#b09975] text-[10px] font-medium italic">Assistente de Voz Ativo</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white apple-transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-6 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-5 py-3 text-[13px] leading-relaxed rounded-[24px] ${
                  msg.role === 'user' 
                    ? 'bg-[#b09975] text-white rounded-tr-none' 
                    : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-6 py-2 rounded-full animate-pulse border border-white/5">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-[#b09975] rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-[#b09975] rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-1 h-1 bg-[#b09975] rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-black/30 space-y-4">
            {isListening && (
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-[#b09975]/30 animate-pulse">
                  <div className="w-2 h-2 bg-[#b09975] rounded-full"></div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Escutando...</span>
                </div>
              </div>
            )}
            <div className="relative flex items-center gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte sobre as pratas..."
                className="flex-grow bg-white/5 border border-white/10 rounded-full py-4 px-6 text-[13px] text-white focus:outline-none focus:border-[#b09975]/60 apple-transition placeholder-white/20"
              />
              <button 
                onClick={toggleVoice}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isListening ? 'bg-[#b09975] scale-110' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isListening ? 'text-white' : 'text-[#b09975]'}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-[#1a1a1a] shadow-2xl border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 apple-transition group relative"
        >
          <div className="absolute inset-0 bg-[#b09975]/10 rounded-full animate-ping group-hover:hidden"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b09975" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
      )}
    </div>
  );
};

export default GeminiAdvisor;
