'use client';

import { useEffect, useState, useRef } from 'react';

interface TextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  variant?: 'fade' | 'slideUp' | 'blur' | 'scale';
  stagger?: number;
  trigger?: 'auto' | 'scroll' | 'hover';
  once?: boolean;
}

export default function TextReveal({
  text,
  delay = 0,
  duration = 50,
  className = '',
  variant = 'fade',
  stagger = 30,
  trigger = 'auto',
  once = true,
}: TextRevealProps) {
  const [visibleChars, setVisibleChars] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(' ');
  let charIndex = 0;
  const wordChars = words.map(word => {
    const chars = word.split('').map((char, i) => ({
      char,
      index: charIndex++
    }));
    charIndex++;
    return chars;
  });

  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (trigger === 'scroll') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && (!once || !hasAnimated)) {
              setIsVisible(true);
              if (once) setHasAnimated(true);
            } else if (!once && !entry.isIntersecting) {
              setIsVisible(false);
              setVisibleChars(0);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [delay, trigger, once, hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    let currentChar = 0;
    const totalChars = text.length;

    const interval = setInterval(() => {
      if (currentChar <= totalChars) {
        setVisibleChars(currentChar);
        currentChar++;
      } else {
        clearInterval(interval);
      }
    }, duration);

    return () => clearInterval(interval);
  }, [isVisible, text, duration]);

  const getAnimationClass = (index: number, variant: string) => {
    const isRevealed = index < visibleChars;
    
    const baseClasses = 'inline-block transition-all';
    
    const variants = {
      fade: isRevealed
        ? 'opacity-100'
        : 'opacity-0',
      slideUp: isRevealed
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-4',
      blur: isRevealed
        ? 'opacity-100 blur-0'
        : 'opacity-0 blur-sm',
      scale: isRevealed
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-95',
    };

    return `${baseClasses} ${variants[variant]}`;
  };

  const getTransitionStyle = (index: number) => {
    return {
      transitionDelay: `${index * stagger}ms`,
      transitionDuration: `${duration * 10}ms`,
    };
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false);
      setVisibleChars(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`text-reveal ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {wordChars.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.map(({ char, index }) => (
            <span
              key={index}
              className={getAnimationClass(index, variant)}
              style={getTransitionStyle(index)}
            >
              {char}
            </span>
          ))}
          {wordIdx < wordChars.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
}