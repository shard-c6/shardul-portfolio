import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LeetcodeGate({ hintName, prefix, suffix, expectedChar, children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const handleInput = (e) => {
    const val = e.target.value;
    if (!val) return;
    
    if (val === expectedChar) {
       setUnlocked(true);
       // Allow DOM to process the unlocked class before recalculating ScrollTrigger heights
       setTimeout(() => ScrollTrigger.refresh(), 400);
    } else {
       setError(true);
       setTimeout(() => {
          setError(false);
          if (inputRef.current) inputRef.current.value = "";
       }, 500);
    }
  }

  return (
    <>
      <div className="leetcode-transition-wrapper">
         <div className={`leetcode-transition-block ${error ? 'error-shake' : ''} ${unlocked ? 'gate-solved' : ''}`}>
           <div className="lt-header">
             <div className="lt-dots">
               <div className="lt-dot" style={{ background: '#FF5F56' }}></div>
               <div className="lt-dot" style={{ background: '#FFBD2E' }}></div>
               <div className="lt-dot" style={{ background: '#27C93F' }}></div>
             </div>
             <div className="lt-title">
               {hintName} 
               <span className={`lt-gate-badge ${unlocked ? 'badge-solved' : 'badge-locked'}`}>
                 {unlocked ? 'SOLVED' : 'LOCKED'}
               </span>
             </div>
           </div>
           <div className="lt-code">
             <div className="pre-block" style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre' }}>
               {prefix}
               <input 
                 ref={inputRef} 
                 type="text" 
                 maxLength={1} 
                 className="gate-input"
                 onChange={handleInput}
                 placeholder="_"
                 autoComplete="off"
                 disabled={unlocked}
               />
               {suffix}
             </div>
           </div>
         </div>
      </div>
      
      <div className={`gate-content ${unlocked ? 'gate-unlocked' : 'gate-locked'}`}>
        {children}
      </div>
    </>
  );
}
