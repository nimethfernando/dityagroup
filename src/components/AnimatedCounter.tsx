'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({ value, className = '', duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [displayValue, setDisplayValue] = useState(value);

  // Extract number and formatting from the input string (e.g. "3,000 +" -> num: 3000, hasComma: true, prefix: "", suffix: " +")
  const match = value ? value.match(/^([^0-9]*)([\d,]+)(.*)$/) : null;

  useEffect(() => {
    if (!isInView || !match) return;

    const rawNumStr = match[2].replace(/,/g, '');
    const targetNum = parseInt(rawNumStr, 10);
    if (isNaN(targetNum)) return;

    const prefix = match[1] || '';
    const suffix = match[3] || '';
    const hasComma = match[2].includes(',');

    const controls = animate(0, targetNum, {
      duration,
      ease: [0.16, 1, 0.3, 1], // snappy easeOutExpo
      onUpdate(latest) {
        const rounded = Math.round(latest);
        const formatted = hasComma ? rounded.toLocaleString() : rounded.toString();
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : match ? `${match[1]}0${match[3]}` : value}
    </span>
  );
}

interface AnimatedRadialProgressProps {
  percentage: string | number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  trackColor?: string;
}

export function AnimatedRadialProgress({
  percentage,
  size = 96,
  strokeWidth = 6,
  strokeColor = '#059669',
  trackColor = '#ECFDF5',
}: AnimatedRadialProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  // Parse percentage number (e.g. "95%" -> 95)
  const numPercent =
    typeof percentage === 'number'
      ? percentage
      : parseInt(String(percentage).replace(/[^0-9]/g, ''), 10) || 0;

  const [currentPercent, setCurrentPercent] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPercent / 100) * circumference;

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, numPercent, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setCurrentPercent(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, numPercent]);

  return (
    <div
      ref={ref}
      className="relative inline-flex items-center justify-center shrink-0 shadow-sm rounded-full bg-white"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
      </svg>
      {/* Percentage Center Text */}
      <span className="absolute text-xl font-extrabold text-[#041614] tracking-tight">
        {currentPercent}%
      </span>
    </div>
  );
}

