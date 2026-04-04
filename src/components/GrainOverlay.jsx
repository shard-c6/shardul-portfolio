export default function GrainOverlay() {
  return (
    <svg className="grain-overlay" width="100%" height="100%">
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter="url(#grain-filter)"
      />
    </svg>
  );
}
