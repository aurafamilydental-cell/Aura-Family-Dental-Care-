"use client";

import { useState, useRef, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full bg-accent/5 rounded-brand border border-border-subtle overflow-hidden shadow-sm select-none cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Before Image (Base) */}
      <img
        src={beforeImage}
        alt="Before transformation"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        onError={(e) => {
          // Fallback if image doesn't exist
          e.currentTarget.style.display = "none";
        }}
      />
      {/* Before Text Label */}
      <div className="absolute bottom-4 left-4 z-20 bg-accent/80 backdrop-blur-sm px-3 py-1 rounded text-white text-xs font-semibold uppercase tracking-wider">
        {beforeLabel}
      </div>

      {/* After Image (Clipped Overlay) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={afterImage}
          alt="After transformation"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      {/* After Text Label */}
      <div className="absolute bottom-4 right-4 z-20 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded text-white text-xs font-semibold uppercase tracking-wider">
        {afterLabel}
      </div>

      {/* If images fail, display a beautiful placeholder */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-tr from-primary/5 to-accent/5">
        <div className="text-center p-6">
          <span className="text-4xl text-primary/40 block mb-2"></span>
          <p className="text-accent/60 font-heading text-lg">Smile Transformation</p>
          <p className="text-accent/40 text-xs mt-1">Drag slider to compare</p>
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-accent hover:bg-primary text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white transition-colors cursor-ew-resize">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
          </svg>
        </div>
      </div>
    </div>
  );
}
