import React, { useState } from 'react';
import { LETTER_CONTENT } from '../constants';
import { FadeIn } from './FadeIn';

export const Letter: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback if imageUrls is undefined but imageUrl exists (for safety)
  // @ts-ignore
  const images = LETTER_CONTENT.imageUrls || (LETTER_CONTENT.imageUrl ? [LETTER_CONTENT.imageUrl] : []);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="py-24 md:py-32 flex flex-col items-center justify-center relative">
      <FadeIn>
        <div className="max-w-xl w-full px-6">
          <p className="text-center text-stone-600 mb-8 serif italic text-sm md:text-base">
            — 见字如面 —
          </p>
          
          <div 
            className={`relative bg-stone-900 shadow-2xl p-4 md:p-8 transform transition-all duration-1000 ease-in-out
              ${isRevealed ? 'rotate-0 scale-100 opacity-100' : 'rotate-1 scale-95 opacity-80 hover:rotate-0 hover:opacity-100 cursor-pointer'}
            `}
            onClick={() => !isRevealed && setIsRevealed(true)}
          >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-stone-950/20 mix-blend-multiply pointer-events-none z-20"></div>
            
            {/* The Letter Image Container */}
            <div className="aspect-[3/4] overflow-hidden bg-stone-800 relative group border border-stone-800">
                
                {/* Images Stack */}
                {images.map((img: string, idx: number) => (
                    <img 
                        key={idx}
                        src={img} 
                        alt={`Letter page ${idx + 1}`} 
                        className={`absolute inset-0 w-full h-full object-cover filter sepia-[0.3] contrast-100 opacity-90 transition-opacity duration-700 ease-in-out
                            ${idx === currentIndex ? 'opacity-90 z-10' : 'opacity-0 z-0'}
                        `}
                    />
                ))}
                
                {/* Reveal Overlay (Only if not revealed) */}
                {!isRevealed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-30">
                         <span className="bg-stone-800/90 backdrop-blur-sm px-6 py-2 rounded-full text-xs tracking-widest text-stone-200 shadow-lg border border-stone-700/50 animate-pulse">
                            点击展开
                         </span>
                    </div>
                )}

                {/* Navigation Controls (Only if revealed and multiple images) */}
                {isRevealed && images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            disabled={currentIndex === 0}
                            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-stone-900/50 backdrop-blur text-stone-200 transition-all duration-300 z-30
                                ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100 hover:bg-stone-900/80'}
                            `}
                        >
                            ←
                        </button>
                        
                        <button
                            onClick={next}
                            disabled={currentIndex === images.length - 1}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-stone-900/50 backdrop-blur text-stone-200 transition-all duration-300 z-30
                                ${currentIndex === images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100 hover:bg-stone-900/80'}
                            `}
                        >
                            →
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-stone-900/30 px-3 py-1.5 rounded-full backdrop-blur-[1px]">
                            {images.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 
                                        ${idx === currentIndex ? 'bg-stone-200 scale-125' : 'bg-stone-500/80 hover:bg-stone-400'}
                                    `}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
          </div>

          <div className={`mt-12 text-center transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <p className="serif text-stone-100 text-lg mb-2">{LETTER_CONTENT.title}</p>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
               {LETTER_CONTENT.description.split('\n').map((line, i) => (
                 <React.Fragment key={i}>
                   {line}<br/>
                 </React.Fragment>
               ))}
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};