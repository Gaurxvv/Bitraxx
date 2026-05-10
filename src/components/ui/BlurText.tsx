'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: any;
  animationTo?: any;
  easing?: any;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const BlurText = ({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.2,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = [0.22, 1, 0.36, 1],
  onAnimationComplete,
  stepDuration = 0.8
}: BlurTextProps) => {
  const elements = useMemo(() => 
    animateBy === 'words' ? text.split(' ') : text.split(''),
    [text, animateBy]
  );
  
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const variants: Variants = {
    hidden: animationFrom ?? (direction === 'top' 
      ? { filter: 'blur(10px)', opacity: 0, y: 30 } 
      : { filter: 'blur(10px)', opacity: 0, y: -30 }),
    visible: (i: number) => ({
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: stepDuration,
        delay: (i * delay) / 1000,
        ease: easing,
      }
    })
  };

  return (
    <p 
      ref={ref} 
      className={className} 
      style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'inherit',
        columnGap: animateBy === 'words' ? '0.25em' : '0em'
      }}
    >
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="inline-block will-change-[transform,filter,opacity]"
          style={{ 
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {segment === '' ? '\u00A0' : segment}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
