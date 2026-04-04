import { useEffect, useRef } from 'react';

/**
 * Velocity Marquee — text strip that scrolls horizontally
 * and accelerates based on user scroll speed.
 * Creates the "crazy scrolling" feel between sections.
 */
export default function VelocityMarquee({ text = 'SCROLL', count = 12, direction = 'left', className = '' }) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const baseSpeed = direction === 'left' ? -0.5 : 0.5;
  const positionRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    let running = true;

    // Track scroll velocity
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity.current = (currentY - lastScrollY.current) * 0.15;
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    const animate = () => {
      if (!running) return;

      // Decay velocity
      scrollVelocity.current *= 0.92;

      // Move position
      const speed = baseSpeed + scrollVelocity.current * (direction === 'left' ? -0.3 : 0.3);
      positionRef.current += speed;

      // Get width of one copy of the text
      const singleWidth = inner.scrollWidth / 2;

      // Reset when scrolled past one full copy
      if (direction === 'left' && positionRef.current <= -singleWidth) {
        positionRef.current += singleWidth;
      }
      if (direction === 'right' && positionRef.current >= 0) {
        positionRef.current -= singleWidth;
      }

      inner.style.transform = `translateX(${positionRef.current}px)`;

      // Skew based on velocity for extra craziness
      const skew = Math.max(-8, Math.min(8, scrollVelocity.current * 0.5));
      inner.style.transform = `translateX(${positionRef.current}px) skewX(${skew}deg)`;

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      running = false;
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [baseSpeed, direction]);

  const items = Array.from({ length: count }, (_, i) => (
    <span key={i} className="marquee-item">{text}</span>
  ));

  return (
    <div ref={containerRef} className={`velocity-marquee ${className}`}>
      <div ref={innerRef} className="marquee-inner">
        {items}
        {/* Duplicate for seamless loop */}
        {items}
      </div>
    </div>
  );
}
