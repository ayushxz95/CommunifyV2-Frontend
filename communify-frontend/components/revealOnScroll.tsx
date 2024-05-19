"use client";
import React, { useRef, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  children: ReactNode;
}

const RevealOnScroll: React.FC<Props> = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the element is visible
  });

  const revealRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <div
        ref={revealRef}
        className={`transition-opacity duration-1000 delay-200 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default RevealOnScroll;

