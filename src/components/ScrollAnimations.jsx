import { useEffect, useRef } from 'react';

/**
 * ════════════════════════════════════════
 * SNAPPY IDE SCROLL ANIMATIONS ENGINE
 * ════════════════════════════════════════
 * GSAP ScrollTrigger animations adjusted for high-speed, 
 * zero-latency feel ideal for a developer portfolio.
 */
export default function ScrollAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let ctx;

    const init = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default || gsapModule.gsap;
      const ScrollTrigger = stModule.default || stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // 1. HERO — Fast Exit
        gsap.to('.hero-text', {
          y: -50,
          opacity: 0,
          scale: 0.98,
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'center top',
            scrub: 0.1,
          },
        });

        gsap.to('.hero-canvas', {
          y: 30,
          opacity: 0,
          scrollTrigger: {
            trigger: '.hero',
            start: '10% top',
            end: 'center top',
            scrub: 0.1,
          },
        });

        gsap.to('.scroll-indicator', {
          opacity: 0,
          y: -10,
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '10% top',
            scrub: true,
          },
        });

        // 2. SECTION NUMBERS
        gsap.utils.toArray('.section-number').forEach((num) => {
          gsap.fromTo(num,
            { y: 30, opacity: 0 },
            {
              y: -10,
              opacity: 0.15,
              scrollTrigger: {
                trigger: num.parentElement,
                start: 'top 90%',
                end: 'top 20%',
                scrub: 0.2,
              },
            }
          );
        });

        // 3. SECTION LABELS
        gsap.utils.toArray('.section-label').forEach((label) => {
          gsap.from(label, {
            x: -20,
            opacity: 0,
            duration: 0.3,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // 4. SECTION TITLES
        gsap.utils.toArray('.section-title').forEach((title) => {
          const text = title.textContent;
          title.innerHTML = '';
          text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.willChange = 'transform, opacity';
            title.appendChild(span);
          });

          const chars = title.querySelectorAll('span');
          gsap.from(chars, {
            y: 20,
            opacity: 0,
            stagger: 0.02,
            duration: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // 5. ABOUT
        gsap.to('.about-avatar-frame', {
          rotation: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.utils.toArray('.about-stat').forEach((stat, i) => {
          gsap.from(stat, {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            delay: i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.about-stats',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        gsap.utils.toArray('.about-paragraph').forEach((p) => {
          gsap.fromTo(p,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: 20 },
            {
              clipPath: 'inset(0 0% 0 0)', opacity: 1, x: 0,
              duration: 0.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: p,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // 6. SKILL CARDS
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
          gsap.from(card, {
            scale: 0.9,
            opacity: 0,
            y: 20,
            duration: 0.3,
            delay: i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
          const proficiency = bar.getAttribute('data-proficiency');
          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: `${proficiency}%`,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: bar.closest('.skill-card'),
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        gsap.utils.toArray('.learning-pill').forEach((pill, i) => {
          gsap.from(pill, {
            x: -15,
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
            delay: i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.learning-roadmap',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // 7. PROJECT CARDS
        gsap.utils.toArray('.project-card').forEach((card, i) => {
          gsap.from(card, {
            scale: 0.95,
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // 8. TIMELINE
        const spineProgress = document.querySelector('.timeline-spine-progress');
        if (spineProgress) {
          gsap.to(spineProgress, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.timeline',
              start: 'top center',
              end: 'bottom center',
              scrub: 0.2,
            },
          });
        }

        gsap.utils.toArray('.timeline-dot').forEach((dot) => {
          gsap.from(dot, {
            scale: 0,
            duration: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: dot,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        gsap.utils.toArray('.timeline-card').forEach((card, i) => {
          const isOdd = i % 2 === 0;
          gsap.from(card, {
            x: isOdd ? -30 : 30,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        const ctaCard = document.querySelector('.timeline-cta-card');
        if (ctaCard) {
          gsap.from(ctaCard, {
            scale: 0.95,
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaCard,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // 9. BLOG CARDS
        gsap.utils.toArray('.blog-card').forEach((card, i) => {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // 10. CURRENTLY ITEMS
        gsap.utils.toArray('.currently-item').forEach((item, i) => {
          gsap.from(item, {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.currently',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // 11. CONTACT
        gsap.utils.toArray('.contact-headline .word').forEach((word, i) => {
          gsap.from(word, {
            y: 30,
            opacity: 0,
            duration: 0.4,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-headline',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        gsap.utils.toArray('.contact-card').forEach((card, i) => {
          gsap.from(card, {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-cards',
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // 12. GLOBAL PARALLAX
        gsap.utils.toArray('.section, .section-full').forEach((sec) => {
          const inner = sec.querySelector('.section-title');
          if (!inner) return;
          gsap.to(inner, {
            y: -10,
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        });

        // 13. FOOTER
        gsap.from('.footer', {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.footer',
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        });

        // 14. NAVBAR
        ScrollTrigger.create({
          start: 50,
          end: 99999,
          onUpdate: (self) => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
              navbar.classList.toggle('scrolled', self.isActive);
            }
          },
        });

      }); 
    };

    init();

    return () => ctx?.revert();
  }, []);

  return null;
}
