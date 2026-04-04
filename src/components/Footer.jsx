import { useState, useEffect } from 'react';
import { PERSONAL } from '../constants';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <footer className="footer">
      <div className="footer-left">
        {PERSONAL.initials} — {PERSONAL.name}
      </div>
      <div className="footer-center">
        Built with intention.
      </div>
      <div className="footer-right">
        {formattedTime}
      </div>
    </footer>
  );
}
