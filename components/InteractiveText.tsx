import React, { useState } from 'react';
import { INTERACTIVE_KEYWORDS } from '../constants';
import { InteractiveKeyword } from '../types';
import { pickRandom } from '../utils';

interface InteractiveTextProps {
  content: string;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({ content }) => {
  // We need to split the content by keywords and insert interactive spans
  const parts: (string | React.ReactNode)[] = [content];

  INTERACTIVE_KEYWORDS.forEach((keywordObj) => {
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (typeof part === 'string' && part.includes(keywordObj.word)) {
        const splitParts = part.split(keywordObj.word);
        const newParts: (string | React.ReactNode)[] = [];
        
        splitParts.forEach((sp, index) => {
          newParts.push(sp);
          if (index < splitParts.length - 1) {
            newParts.push(
              <KeywordSpan key={`${keywordObj.word}-${i}-${index}`} keywordObj={keywordObj} />
            );
          }
        });
        
        parts.splice(i, 1, ...newParts);
        // Adjust index to skip newly added parts
        i += newParts.length - 1;
      }
    }
  });

  return (
    <p className="text-lg md:text-xl leading-loose tracking-wide font-light text-stone-300">
      {parts}
    </p>
  );
};

const KeywordSpan: React.FC<{ keywordObj: InteractiveKeyword }> = ({ keywordObj }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const handleClick = () => {
    if (!isVisible) {
      setResponse(pickRandom(keywordObj.responses));
      setIsVisible(true);
      setHasBeenClicked(true);
      
      // Auto fade out after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  };

  return (
    <span className="relative inline-block group whitespace-nowrap">
      <span 
        onClick={handleClick}
        className={`
          cursor-pointer transition-all duration-300 mx-1 px-1 rounded-sm
          ${hasBeenClicked 
            ? 'text-stone-500 border-b border-transparent' 
            : 'text-stone-400 font-medium border-b border-stone-600 hover:bg-stone-800'
          }
        `}
      >
        {keywordObj.word}
        
        {/* Unclicked Indicator: Pulsing Dot */}
        {!hasBeenClicked && (
           <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-500 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-stone-600"></span>
           </span>
        )}
      </span>
      
      {/* Pop-up Response */}
      <span 
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-max max-w-[200px] md:max-w-[300px] 
        bg-stone-800 text-stone-200 text-xs md:text-sm px-4 py-3 rounded shadow-xl 
        pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        z-20 border border-stone-700
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`}
      >
        {response}
        {/* Little triangle arrow */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800"></span>
      </span>
    </span>
  );
};