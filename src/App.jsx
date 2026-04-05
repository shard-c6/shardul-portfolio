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
import LeetcodeTransition from './components/LeetcodeTransition';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Blog from './components/Blog';
import Currently from './components/Currently';
import Contact from './components/Contact';
import Footer from './components/Footer';

const LC_TWO_SUM = (
  <pre>
<span style={{ color: "var(--syntax-keyword)" }}>def</span> <span style={{ color: "var(--syntax-function)" }}>twoSum</span>(nums, target):{"\n"}
{"    "}seen = {"{}"}{"\n"}
{"    "}<span style={{ color: "var(--syntax-keyword)" }}>for</span> i, v <span style={{ color: "var(--syntax-keyword)" }}>in</span> enumerate(nums):{"\n"}
{"        "}rem = target - v{"\n"}
{"        "}<span style={{ color: "var(--syntax-keyword)" }}>if</span> rem <span style={{ color: "var(--syntax-keyword)" }}>in</span> seen:{"\n"}
{"            "}<span style={{ color: "var(--syntax-keyword)" }}>return</span> [seen[rem], i]{"\n"}
{"        "}seen[v] = i{"\n"}
{"    "}<span style={{ color: "var(--syntax-keyword)" }}>return</span> []
  </pre>
);

const LC_REVERSE_LIST = (
  <pre>
<span style={{ color: "var(--syntax-keyword)" }}>def</span> <span style={{ color: "var(--syntax-function)" }}>reverseList</span>(head):{"\n"}
{"    "}prev = <span style={{ color: "var(--syntax-string)" }}>None</span>{"\n"}
{"    "}curr = head{"\n"}
{"    "}<span style={{ color: "var(--syntax-keyword)" }}>while</span> curr:{"\n"}
{"        "}temp = curr.next{"\n"}
{"        "}curr.next = prev{"\n"}
{"        "}prev = curr{"\n"}
{"        "}curr = temp{"\n"}
{"    "}<span style={{ color: "var(--syntax-keyword)" }}>return</span> prev
  </pre>
);

const LC_BFS = (
  <pre>
<span style={{ color: "var(--syntax-keyword)" }}>def</span> <span style={{ color: "var(--syntax-function)" }}>bfs</span>(graph, start):{"\n"}
{"    "}visited = {"set()"} {"\n"}
{"    "}queue = [start]{"\n"}
{"    "}<span style={{ color: "var(--syntax-keyword)" }}>while</span> queue:{"\n"}
{"        "}node = queue.pop(0){"\n"}
{"        "}<span style={{ color: "var(--syntax-keyword)" }}>if</span> node <span style={{ color: "var(--syntax-keyword)" }}>not in</span> visited:{"\n"}
{"            "}visited.add(node){"\n"}
{"            "}queue.extend(graph[node] - visited){"\n"}
{"    "}<span style={{ color: "var(--syntax-keyword)" }}>return</span> visited
  </pre>
);

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

        {/* Section 2 — About Me */}
        <div style={{ position: 'relative' }}>
          <VelocityMarquee
            text="ABOUT ME ✦"
            count={10}
            direction="left"
            className="marquee-background"
          />
          <About />
        </div>

        <LeetcodeTransition hintName="Two Sum (O(N) Time)" snippet={LC_TWO_SUM} />

        {/* Section 3 — Skills & Tech Stack */}
        <div style={{ position: 'relative' }}>
          <VelocityMarquee
            text="TECHNOLOGIES ✦ SKILLS ✦"
            count={8}
            direction="right"
            className="marquee-background marquee-accent"
          />
          <Skills />
        </div>

        <LeetcodeTransition hintName="Reverse Linked List (O(N) Time, O(1) Space)" snippet={LC_REVERSE_LIST} />

        {/* Section 4 — Projects Showcase */}
        <div style={{ position: 'relative' }}>
          <VelocityMarquee
            text="SELECTED WORK ✦"
            count={10}
            direction="left"
            className="marquee-background"
          />
          <Projects />
        </div>

        <LeetcodeTransition hintName="Breadth-First Search" snippet={LC_BFS} />

        {/* Section 5 — Resume / Timeline */}
        <div style={{ position: 'relative' }}>
          <VelocityMarquee
            text="JOURNEY ✦ TIMELINE ✦"
            count={8}
            direction="right"
            className="marquee-background marquee-accent"
          />
          <Timeline />
        </div>

        {/* Section 6 — Blog / Thoughts */}
        <div style={{ position: 'relative' }}>
          <VelocityMarquee
            text="THOUGHTS ✦ BLOG ✦"
            count={10}
            direction="left"
            className="marquee-background"
          />
          <Blog />
        </div>

        {/* Section 7 — Currently / Open To */}
        <Currently />

        {/* Section 8 — Contact */}
        <div style={{ position: 'relative' }}>
          <VelocityMarquee
            text="LET'S BUILD SOMETHING ✦"
            count={8}
            direction="right"
            className="marquee-background marquee-large"
          />
          <Contact />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
