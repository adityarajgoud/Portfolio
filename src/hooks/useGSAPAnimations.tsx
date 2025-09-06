import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log('Initializing GSAP animations');

    // Simple entrance animations without scroll triggers initially
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo('.hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    )
    .fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=1'
    )
    .fromTo('.hero-cta', 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5'
    );

    
    // Floating elements continuous animation
    gsap.to('.float-element', {
      y: '+=20',
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });

    // Pulse animation for interactive elements
    gsap.to('.pulse-element', {
      scale: 1.05,
      duration: 1.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    });

    console.log('GSAP animations initialized successfully');

    return () => {
      console.log('Cleaning up GSAP animations');
      gsap.killTweensOf('.hero-title, .hero-subtitle, .hero-cta, .float-element, .pulse-element');
    };
  }, []);
};