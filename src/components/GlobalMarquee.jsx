import VelocityMarquee from './VelocityMarquee';

export default function GlobalMarquee() {
  return (
    <div className="global-marquee-container">
      {/* Opacity mask gradient to make edges fade out, optional */}
      <div className="marquee-fade-overlay"></div>
      
      <VelocityMarquee
        text="TECHNOLOGIES ✦ SKILLS ✦"
        count={8}
        direction="left"
        className="gm-line-1 gm-accent"
      />
      <VelocityMarquee
        text="ALGORITHMS ✦ SYSTEMS ✦"
        count={8}
        direction="right"
        className="gm-line-2"
      />
      <VelocityMarquee
        text="ARCHITECTURE ✦ DEVELOPMENT ✦"
        count={6}
        direction="left"
        className="gm-line-3 gm-accent"
      />
      <VelocityMarquee
        text="CREATING IMPACT ✦ INNOVATION ✦"
        count={6}
        direction="right"
        className="gm-line-4"
      />
    </div>
  );
}
