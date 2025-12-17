import React, { useEffect, useState } from 'react';
import { 
  INTRO_QUOTES, 
  MIDDLE_SECTIONS_POOL, 
  FINAL_SECTION, 
  OUTRO_QUOTES,
  MEMORIES 
} from './constants';
import { shuffleArray, pickRandom } from './utils';
import { ContentBlock, Memory } from './types';
import { FadeIn } from './components/FadeIn';
import { InteractiveText } from './components/InteractiveText';
import { Letter } from './components/Letter';
import { MemoryModal } from './components/MemoryModal';
import { BackgroundEffect } from './components/BackgroundEffect';

const App: React.FC = () => {
  const [introQuote, setIntroQuote] = useState("");
  const [middleSections, setMiddleSections] = useState<ContentBlock[]>([]);
  const [outroQuote, setOutroQuote] = useState("");
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [shuffledMemories, setShuffledMemories] = useState<Memory[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine random content on mount
    setIntroQuote(pickRandom(INTRO_QUOTES));
    setMiddleSections(shuffleArray(MIDDLE_SECTIONS_POOL));
    setOutroQuote(pickRandom(OUTRO_QUOTES));
    setShuffledMemories(shuffleArray(MEMORIES));
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-screen w-screen bg-stone-950" />;

  return (
    <div className="min-h-screen w-full bg-stone-950 text-stone-200 selection:bg-stone-800 selection:text-stone-200 relative">
      
      {/* Background Effect Layer */}
      <BackgroundEffect />

      {/* Global Memory Modal */}
      <MemoryModal 
        memory={activeMemory} 
        onClose={() => setActiveMemory(null)} 
      />

      {/* 1. Intro Section */}
      <section className="h-screen flex flex-col items-center justify-center p-8 text-center relative z-10">
        <FadeIn delay={200}>
            <h1 className="serif text-2xl md:text-4xl text-stone-300 tracking-wider mb-12 leading-relaxed">
              {introQuote}
            </h1>
        </FadeIn>
        
        <FadeIn delay={1000} className="absolute bottom-12 md:bottom-20">
          <div className="text-xs md:text-sm text-stone-600 tracking-[0.2em] font-light flex flex-col gap-2">
            <span>TO ZHANG SHIYAO</span>
            <span>2025.12.22</span>
          </div>
        </FadeIn>
      </section>

      {/* 2. Middle Sections with Interleaved Memory Triggers */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 relative z-10">
        {middleSections.map((section, index) => (
          <React.Fragment key={section.id}>
            <section className="py-24 md:py-32 relative">
              <FadeIn>
                <div className="mb-8 md:mb-12">
                  <h2 className="serif text-xl md:text-2xl text-stone-100 mb-2">
                    {section.title}
                  </h2>
                  <div className="h-px w-12 bg-stone-800 mt-6"></div>
                </div>
                <InteractiveText content={section.content} />
              </FadeIn>
            </section>

            {/* Subtle Memory Trigger inserted randomly between sections if available */}
            {index < middleSections.length - 1 && shuffledMemories[index] && (
              <div className="flex justify-center py-8">
                 <FadeIn delay={200}>
                   <button 
                     onClick={() => setActiveMemory(shuffledMemories[index])}
                     className="group relative w-12 h-12 flex items-center justify-center focus:outline-none"
                     aria-label="View Memory"
                   >
                     {/* Pulsing Ring Background */}
                     <span className="absolute inset-0 m-1 rounded-full border border-stone-800 animate-[ping_3s_ease-in-out_infinite] opacity-50 group-hover:opacity-20"></span>
                     
                     {/* Hover Ring */}
                     <span className="absolute inset-0 m-2 rounded-full bg-stone-900 scale-0 group-hover:scale-100 transition-transform duration-500"></span>

                     <span className="text-stone-600 group-hover:text-stone-300 text-xl transition-colors duration-500 relative z-10">✦</span>
                     
                     <span className="absolute top-full mt-2 text-[10px] tracking-widest text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
                        点击查看回忆
                     </span>
                   </button>
                 </FadeIn>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 3. The Letter (Fixed Core) */}
      <div className="relative z-10">
        <Letter />
      </div>

      {/* 4. The "Now" Section (Fixed) */}
      <section className="max-w-2xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
        <FadeIn>
          <div className="mb-8 md:mb-12">
            <h2 className="serif text-xl md:text-2xl text-stone-100 mb-2">
              {FINAL_SECTION.title}
            </h2>
            <div className="h-px w-12 bg-stone-800 mt-6"></div>
          </div>
          <InteractiveText content={FINAL_SECTION.content} />
        </FadeIn>
        
        {/* Final Memory Trigger if any left */}
        {shuffledMemories.length > middleSections.length - 1 && (
             <div className="flex justify-center py-12">
             <FadeIn delay={200}>
               <button 
                 onClick={() => setActiveMemory(shuffledMemories[shuffledMemories.length - 1])}
                 className="group relative w-12 h-12 flex items-center justify-center focus:outline-none"
               >
                 <span className="absolute inset-0 m-1 rounded-full border border-stone-800 animate-[ping_3s_ease-in-out_infinite] opacity-50 group-hover:opacity-20"></span>
                 <span className="absolute inset-0 m-2 rounded-full bg-stone-900 scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                 <span className="text-stone-600 group-hover:text-stone-300 text-xl transition-colors duration-500 relative z-10">✦</span>
               </button>
             </FadeIn>
          </div>
        )}
      </section>

      {/* 5. Outro Section */}
      <section className="h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-stone-950 to-black relative z-10">
        <FadeIn>
          <p className="serif text-xl md:text-3xl text-stone-400 leading-relaxed mb-16">
            {outroQuote}
          </p>
        </FadeIn>

        <FadeIn delay={500}>
          <div className="flex flex-col items-center gap-4">
             <div className="w-px h-16 bg-stone-800 mb-4"></div>
             <p className="text-xs text-stone-600 tracking-widest uppercase">
               Happy Birthday
             </p>
             <p className="text-sm font-medium text-stone-300 tracking-widest">
               章诗瑶
             </p>
             <p className="text-xs text-stone-600 mt-2 font-light">
               从很久以前，到现在。
             </p>
          </div>
        </FadeIn>
      </section>

    </div>
  );
};

export default App;