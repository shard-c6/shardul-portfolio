import { useState, useCallback } from 'react';
import './App.css';

import { useLenis } from './hooks/useLenis';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import GrainOverlay from './components/GrainOverlay';
import ScrollAnimations from './components/ScrollAnimations';
import GlobalMarquee from './components/GlobalMarquee';
import LeetcodeGate from './components/LeetcodeGate';
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

      {/* Global Background Marquee */}
      <GlobalMarquee />

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

        {/* --- GATE 1 --- */}
        <LeetcodeGate 
          hintName="Fix Python Syntax Error" 
          expectedChar=":"
          prefix={<><span style={{ color: "var(--syntax-keyword)" }}>def</span> <span style={{ color: "var(--syntax-function)" }}>initialize_portfolio</span>(req)</>}
          suffix={<>
{"    "}<span style={{ color: "var(--syntax-keyword)" }}>return</span> <span style={{ color: "var(--syntax-string)" }}>"Welcome to my portfolio"</span>
          </>}
        >
          {/* Section 2 — About Me */}
          <About />

          {/* Section 3 — Skills & Tech Stack */}
          <Skills />

          {/* --- GATE 2 --- */}
          <LeetcodeGate
            hintName="Close Array Bracket"
            expectedChar="]"
            prefix={<><span style={{ color: "var(--syntax-keyword)" }}>const</span> tech_stack = [<span style={{ color: "var(--syntax-string)" }}>"React"</span>, <span style={{ color: "var(--syntax-string)" }}>"Three.js"</span>, <span style={{ color: "var(--syntax-string)" }}>"GSAP"</span></>}
            suffix={<>
console.log(tech_stack);
            </>}
          >
            {/* Section 4 — Projects Showcase */}
            <Projects />

            {/* Section 5 — Resume / Timeline */}
            <Timeline />

            {/* --- GATE 3 --- */}
            <LeetcodeGate
              hintName="Complete function call"
              expectedChar=")"
              prefix={<>console.<span style={{ color: "var(--syntax-function)" }}>log</span>(<span style={{ color: "var(--syntax-string)" }}>"Let's build something!"</span></>}
              suffix={<>;
process.exit(0);
              </>}
            >
              {/* Section 6 — Blog / Thoughts */}
              <Blog />

              {/* Section 7 — Currently / Open To */}
              <Currently />

              {/* Section 8 — Contact */}
              <Contact />

              {/* Footer */}
              <Footer />
            </LeetcodeGate>
          </LeetcodeGate>
        </LeetcodeGate>
      </main>
    </>
  );
}

