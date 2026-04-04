import { useEffect, useRef } from 'react';

/**
 * ════════════════════════════════════════
 * HEAVY SCROLL ANIMATIONS ENGINE
 * ════════════════════════════════════════
 * This component injects intense GSAP ScrollTrigger animations
 * across the entire page — parallax, text splitting, pinning,
 * scale/rotate transitions, velocity marquees, and more.
 *
 * Drop this into App.jsx and it enhances everything automatically.
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
        // ═══════════════════════════════════════
        // 1. HERO — Parallax & Scale Exit
        // ═══════════════════════════════════════
        // Parallax: hero text moves up, canvas moves down as you scroll past
        gsap.to('.hero-text', {
          y: -150,
          opacity: 0,
          scale: 0.92,
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to('.hero-canvas', {
          y: 100,
          scale: 1.1,
          opacity: 0,
          scrollTrigger: {
            trigger: '.hero',
            start: 'center top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Scroll indicator fades away
        gsap.to('.scroll-indicator', {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: '.hero',
            start: '10% top',
            end: '25% top',
            scrub: true,
          },
        });

        // ═══════════════════════════════════════
        // 2. SECTION NUMBERS — Parallax Ghost Numbers
        // ═══════════════════════════════════════
        gsap.utils.toArray('.section-number').forEach((num) => {
          gsap.fromTo(num,
            { y: 80, opacity: 0, scale: 0.7 },
            {
              y: -40,
              opacity: 0.15,
              scale: 1,
              scrollTrigger: {
                trigger: num.parentElement,
                start: 'top 90%',
                end: 'top 20%',
                scrub: 1.5,
              },
            }
          );
        });

        // ═══════════════════════════════════════
        // 3. SECTION LABELS — Slide in from left
        // ═══════════════════════════════════════
        gsap.utils.toArray('.section-label').forEach((label) => {
          gsap.from(label, {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            },
          });
        });

        // ═══════════════════════════════════════
        // 4. SECTION TITLES — Character Split Reveal
        // ═══════════════════════════════════════
        gsap.utils.toArray('.section-title').forEach((title) => {
          // Split text into individual characters
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
            y: 80,
            rotateX: -90,
            opacity: 0,
            stagger: 0.04,
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // ═══════════════════════════════════════
        // 5. ABOUT — Rotating Avatar + Parallax Bio
        // ═══════════════════════════════════════
        gsap.to('.about-avatar-frame', {
          rotation: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });

        // Stats — pop in with scale bounce
        gsap.utils.toArray('.about-stat').forEach((stat, i) => {
          gsap.from(stat, {
            scale: 0,
            opacity: 0,
            rotation: -15,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: '.about-stats',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // Bio paragraphs — staggered wipe from left
        gsap.utils.toArray('.about-paragraph').forEach((p, i) => {
          gsap.fromTo(p,
            {
              clipPath: 'inset(0 100% 0 0)',
              opacity: 0,
              x: 80,
            },
            {
              clipPath: 'inset(0 0% 0 0)',
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: p,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1,
              },
            }
          );
        });

        // ═══════════════════════════════════════
        // 6. SKILL CARDS — 3D Flip & Stagger In
        // ═══════════════════════════════════════
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
          gsap.from(card, {
            rotateY: 90,
            scale: 0.6,
            opacity: 0,
            y: 60,
            duration: 1,
            delay: i * 0.12,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // Proficiency bars — dramatic fill after card entrance 
        gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
          const proficiency = bar.getAttribute('data-proficiency');
          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: `${proficiency}%`,
              duration: 1.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bar.closest('.skill-card'),
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // Learning pills — typewriter reveal
        gsap.utils.toArray('.learning-pill').forEach((pill, i) => {
          gsap.from(pill, {
            x: -30,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.learning-roadmap',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // ═══════════════════════════════════════
        // 7. PROJECT CARDS — Scale-up reveal
        // ═══════════════════════════════════════
        gsap.utils.toArray('.project-card').forEach((card, i) => {
          gsap.from(card, {
            scale: 0.7,
            opacity: 0,
            y: 100,
            rotation: -5 + i * 3,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // ═══════════════════════════════════════
        // 8. TIMELINE — Progressive Draw + Card Entrances
        // ═══════════════════════════════════════
        // Over-ride the JS spine animation with a GSAP scrubbed one
        const spineProgress = document.querySelector('.timeline-spine-progress');
        if (spineProgress) {
          gsap.to(spineProgress, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.timeline',
              start: 'top center',
              end: 'bottom center',
              scrub: 0.5,
            },
          });
        }

        // Timeline dots — pop + ring animation
        gsap.utils.toArray('.timeline-dot').forEach((dot) => {
          gsap.from(dot, {
            scale: 0,
            duration: 0.6,
            ease: 'back.out(3)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // Timeline cards — slide in from alternating sides
        gsap.utils.toArray('.timeline-card').forEach((card, i) => {
          const isOdd = i % 2 === 0;
          gsap.fromTo(card,
            {
              x: isOdd ? -120 : 120,
              opacity: 0,
              rotateZ: isOdd ? -3 : 3,
            },
            {
              x: 0,
              opacity: 1,
              rotateZ: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // Resume CTA — bounce in
        const ctaCard = document.querySelector('.timeline-cta-card');
        if (ctaCard) {
          gsap.from(ctaCard, {
            scale: 0.6,
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: ctaCard,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // ═══════════════════════════════════════
        // 9. BLOG CARDS — Staggered flip-up
        // ═══════════════════════════════════════
        gsap.utils.toArray('.blog-card').forEach((card, i) => {
          gsap.from(card, {
            y: 100,
            rotateX: -15,
            opacity: 0,
            scale: 0.9,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // ═══════════════════════════════════════
        // 10. CURRENTLY ITEMS — Slide up + stagger
        // ═══════════════════════════════════════
        gsap.utils.toArray('.currently-item').forEach((item, i) => {
          gsap.fromTo(item,
            { y: 60, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: i * 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.currently',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // ═══════════════════════════════════════
        // 11. CONTACT — Massive headline reveal
        // ═══════════════════════════════════════
        gsap.utils.toArray('.contact-headline .word').forEach((word, i) => {
          gsap.fromTo(word,
            { y: 120, opacity: 0, rotateX: -90, scale: 0.5 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              scale: 1,
              duration: 1.4,
              delay: i * 0.12,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: '.contact-headline',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // Contact cards — magnetic fly-in from bottom
        gsap.utils.toArray('.contact-card').forEach((card, i) => {
          gsap.from(card, {
            y: 80,
            opacity: 0,
            scale: 0.8,
            rotation: -8 + i * 8,
            duration: 1,
            delay: i * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.contact-cards',
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // ═══════════════════════════════════════
        // 12. GLOBAL — Parallax background shift
        // ═══════════════════════════════════════
        // Every "section" gets a subtle upward parallax on its inner content
        gsap.utils.toArray('.section, .section-full').forEach((sec) => {
          const inner = sec.querySelector('.section-title');
          if (!inner) return;
          gsap.to(inner, {
            y: -20,
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        });

        // ═══════════════════════════════════════
        // 13. FOOTER — Slide up from below
        // ═══════════════════════════════════════
        gsap.from('.footer', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.footer',
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        });

        // ═══════════════════════════════════════
        // 14. NAVBAR — Background on scroll
        // ═══════════════════════════════════════
        ScrollTrigger.create({
          start: 100,
          end: 99999,
          onUpdate: (self) => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
              navbar.classList.toggle('scrolled', self.isActive);
            }
          },
        });

      }); // end gsap.context
    };

    init();

    return () => ctx?.revert();
  }, []);

  return null; // This component renders nothing — it only adds scroll animations
}
