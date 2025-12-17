import React, { useEffect, useState } from 'react';
import { Memory } from '../types';

interface MemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({ memory, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (memory) {
      // Small delay to allow mounting before transition
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [memory]);

  if (!memory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // Wait for animation
        }}
      />

      {/* Card */}
      <div 
        className={`
          relative w-full max-w-sm bg-stone-900 shadow-2xl p-8 
          transform transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          border border-stone-800
          ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}
        `}
      >
        {/* Decorative Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/10 rotate-[-2deg] backdrop-blur-sm z-10"></div>

        <div className="flex flex-col items-center text-center space-y-4">
           <div className="text-xs font-serif italic text-stone-500 tracking-widest border-b border-stone-800 pb-1 mb-4">
             MEMORY FRAGMENT
           </div>
           
           {/* Image Container */}
           <div className="w-full aspect-[4/3] bg-stone-950 mb-2 overflow-hidden relative shadow-sm group">
              <img
                src={memory.imageUrl || `https://picsum.photos/seed/${memory.id}/600/400`}
                alt={memory.title}
                className="w-full h-full object-cover filter contrast-[0.9] sepia-[0.3] group-hover:sepia-0 transition-all duration-1000 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"></div>
           </div>
           
           <h3 className="text-xl font-serif text-stone-100 mt-2">
             {memory.title}
           </h3>
           
           <div className="text-xs font-medium text-stone-400 bg-stone-800 px-2 py-1 rounded">
             {memory.date}
           </div>

           <p className="text-sm leading-7 text-stone-300 font-light mt-2">
             {memory.text}
           </p>
        </div>

        {/* Close hint */}
        <button 
            onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
            }}
            className="absolute top-2 right-2 p-2 text-stone-600 hover:text-stone-300 transition-colors"
        >
            ✕
        </button>
      </div>
    </div>
  );
};