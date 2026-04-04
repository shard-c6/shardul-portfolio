import Spline from '@splinetool/react-spline';
import { SPLINE_SCENE } from '../constants';

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Spline scene={SPLINE_SCENE} />
    </div>
  );
}
