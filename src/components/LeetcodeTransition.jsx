import React, { useRef, useEffect } from 'react';

export default function LeetcodeTransition({ hintName, snippet }) {
  const containerRef = useRef(null);

  // Note: the animation for this will be globally registered 
  // in ScrollAnimations.jsx so everything is kept in one GSAP context.
  
  return (
    <div ref={containerRef} className="leetcode-transition-wrapper">
      <div className="leetcode-transition-block">
        <div className="lt-header">
          <div className="lt-dots">
            <span className="lt-dot" style={{ background: '#EF4444' }}></span>
            <span className="lt-dot" style={{ background: '#F59E0B' }}></span>
            <span className="lt-dot" style={{ background: '#22C55E' }}></span>
          </div>
          <span className="lt-title">LeetCode Hint: {hintName}</span>
        </div>
        <div className="lt-code">
          {snippet}
        </div>
      </div>
    </div>
  );
}
