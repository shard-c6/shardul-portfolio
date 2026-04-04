import { useState, useCallback } from 'react';
import './App.css';

import { useLenis } from './hooks/useLenis';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import GrainOverlay from './components/GrainOverlay';
import ScrollAnimations from './components/ScrollAnimations';
import VelocityMarquee from './components/VelocityMarquee';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Blog from './components/Blog';
import Currently from './components/Currently';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Page Loader */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Grain Noise Overlay */}
      <GrainOverlay />

      {/* Navigation */}
      <Navbar />

      {/* Heavy Scroll Animations Engine — powers all section transitions */}
      {loaded && <ScrollAnimations />}

      {/* Main Content */}
      <main
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
        }}
      >
        {/* Section 1 — Hero */}
        <Hero />

        {/* ── Velocity Marquee Divider ── */}
        <VelocityMarquee
          text="ABOUT ME ✦"
          count={10}
          direction="left"
          className="marquee-divider"
        />

        {/* Section 2 — About Me */}
        <About />

        {/* ── Velocity Marquee Divider ── */}
        <VelocityMarquee
          text="TECHNOLOGIES ✦ SKILLS ✦"
          count={8}
          direction="right"
          className="marquee-divider marquee-accent"
        />

        {/* Section 3 — Skills & Tech Stack */}
        <Skills />

        {/* ── Velocity Marquee Divider ── */}
        <VelocityMarquee
          text="SELECTED WORK ✦"
          count={10}
          direction="left"
          className="marquee-divider"
        />

        {/* Section 4 — Projects Showcase */}
        <Projects />

        {/* ── Velocity Marquee Divider ── */}
        <VelocityMarquee
          text="JOURNEY ✦ TIMELINE ✦"
          count={8}
          direction="right"
          className="marquee-divider marquee-accent"
        />

        {/* Section 5 — Resume / Timeline */}
        <Timeline />

        {/* ── Velocity Marquee Divider ── */}
        <VelocityMarquee
          text="THOUGHTS ✦ BLOG ✦"
          count={10}
          direction="left"
          className="marquee-divider"
        />

        {/* Section 6 — Blog / Thoughts */}
        <Blog />

        {/* Section 7 — Currently / Open To */}
        <Currently />

        {/* ── Velocity Marquee Divider ── */}
        <VelocityMarquee
          text="LET'S BUILD SOMETHING ✦"
          count={8}
          direction="right"
          className="marquee-divider marquee-large"
        />

        {/* Section 8 — Contact */}
        <Contact />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
