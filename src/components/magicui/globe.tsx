"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Globe configuration
// You can customize these values to change the appearance of the globe
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3, // Initial rotation angle (0 to 1)
  dark: 1, // Set to 1 for dark mode, 0 for light mode
  diffuse: 0.6, // Controls the softness of the lighting (0 to 1)
  mapSamples: 16000, // Detail level of the map (higher = more detailed)
  mapBrightness: 0.8, // Brightness of the map (0 to 1)
  baseColor: [1, 1, 1], // Base color in RGB (0-1 scale) - dark blue/purple tone
  markerColor: [149/255, 76/255, 233/255], // Purple color (#954CE9) in RGB format
  glowColor: [0.2, 0.2, 0.4], // Glow color in RGB (0-1 scale)
  // Markers array - each object has location (lat, long) and size
  markers: [
    // Bengaluru coordinates: 12.9716° N, 77.5946° E
    { location: [12.9716, 77.5946], size: 0.1 },
    
    // You can add more markers by uncommenting or adding new locations
    // Format: { location: [latitude, longitude], size: sizeValue }
    // Examples:
    // { location: [40.7128, -74.006], size: 0.1 }, // New York
    // { location: [51.5074, -0.1278], size: 0.08 }, // London
    // { location: [35.6762, 139.6503], size: 0.09 }, // Tokyo
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        // Auto-rotation speed when not interacting
        if (!pointerInteracting.current) phi += 0.002;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
