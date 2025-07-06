import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LandingPage = ({ onFinish }) => {
  const landingRef = useRef(null);

  useEffect(() => {
    gsap.from(landingRef.current, { opacity: 0, duration: 1 });
    gsap.from(".landing-title", { y: -50, opacity: 0, duration: 1.2, ease: "power2.out", delay: 0.3 });
    gsap.from(".landing-btn", { scale: 0.5, opacity: 0, delay: 1, duration: 0.8 });
  }, []);

  const handleStart = () => {
    gsap.to(landingRef.current, {
      opacity: 0,
      y: -100,
      duration: 1,
      onComplete: onFinish,
    });
  };

  return (
    <div className="landing" ref={landingRef}>
      <h1 className="landing-title">🌍 Alsafar Alaman</h1>
      <p className="landing-sub">Book safe rides instantly. Simple, fast, reliable.</p>
      <button className="landing-btn" onClick={handleStart}>Book a Ride →</button>
    </div>
  );
};

export default LandingPage;
