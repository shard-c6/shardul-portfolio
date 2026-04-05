import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxTextLayer({ text, speed = 1, reverse = false, className = "", opacity = 0.05 }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create dramatic parallax movement proportional to the speed
      const yOffset = reverse ? -300 * speed : 300 * speed;
      
      gsap.fromTo(textRef.current,
        { y: -yOffset },
        {
          y: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [speed, reverse]);

  return (
    <div ref={containerRef} className={`parallax-text-container ${className}`}>
      <div 
        ref={textRef} 
        className="parallax-text-hollow"
        style={{ '--parallax-opacity': opacity }}
      >
        {text}
      </div>
    </div>
  );
}
