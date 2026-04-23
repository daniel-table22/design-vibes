"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

export type SliderSize = "1" | "2" | "3";

const trackThickness: Record<SliderSize, string> = {
  "1": "h-1",
  "2": "h-1.5",
  "3": "h-2",
};

interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "className"> {
  size?: SliderSize;
  className?: string;
}

export function Slider({ size = "2", orientation = "horizontal", className = "", ...rest }: SliderProps) {
  const isVert = orientation === "vertical";
  const thick = trackThickness[size];
  return (
    <SliderPrimitive.Root
      orientation={orientation}
      className={`relative flex touch-none select-none items-center ${isVert ? "flex-col h-32 w-3" : "w-48 h-3"} ${className}`}
      {...rest}
    >
      <SliderPrimitive.Track
        className={`relative grow overflow-hidden rounded-full bg-[var(--neutral-3)] ${isVert ? `w-full ${thick}` : `h-full ${thick}`}`}
      >
        <SliderPrimitive.Range className={`absolute bg-[var(--accent-9)] rounded-full ${isVert ? "w-full" : "h-full"}`} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-4 h-4 rounded-full border-2 border-[var(--accent-9)] bg-[var(--neutral-1)] shadow cursor-grab active:cursor-grabbing focus:outline-none" />
    </SliderPrimitive.Root>
  );
}
