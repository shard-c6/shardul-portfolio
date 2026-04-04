import { useEffect, useRef, useState } from 'react';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'exiting' | 'done'
  const svgTextRef = useRef(null);
  const barRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Animate the SVG stroke
    const text = svgTextRef.current;
    if (text) {
      text.style.strokeDashoffset = '0';
    }

    // Animate the progress bar
    const bar = barRef.current;
    if (bar) {
      requestAnimationFrame(() => {
        bar.style.width = '100%';
      });
    }

    // After loading animation, split and exit
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 2000);

    // After exit animation, mark as done
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  if (phase === 'exiting') {
    return (
      <>
        <div
          ref={topRef}
          className="loader-top"
          style={{
            transform: 'translateY(-100%)',
            transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />
        <div
          ref={bottomRef}
          className="loader-bottom"
          style={{
            transform: 'translateY(100%)',
            transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />
      </>
    );
  }

  return (
    <div className="loader-overlay">
      <svg
        width="180"
        height="100"
        viewBox="0 0 180 100"
        style={{ overflow: 'visible' }}
      >
        <text
          ref={svgTextRef}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '72px',
            fontWeight: 700,
            fill: 'none',
            stroke: '#1A1916',
            strokeWidth: 1.5,
            strokeDasharray: 400,
            strokeDashoffset: 400,
            transition: 'stroke-dashoffset 1.8s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          SC
        </text>
      </svg>
      <div className="loader-bar-track">
        <div
          ref={barRef}
          className="loader-bar-fill"
          style={{
            transition: 'width 1.8s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        />
      </div>
    </div>
  );
}
