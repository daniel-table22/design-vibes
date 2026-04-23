"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

export type AvatarSize = "1" | "2" | "3" | "4" | "5" | "6";

const sizeClasses: Record<AvatarSize, string> = {
  "1": "w-5 h-5 text-[10px]",
  "2": "w-6 h-6 text-[11px]",
  "3": "w-8 h-8 text-[13px]",
  "4": "w-10 h-10 text-[15px]",
  "5": "w-12 h-12 text-[17px]",
  "6": "w-16 h-16 text-[20px]",
};

interface AvatarProps {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export function Avatar({ size = "4", src, alt = "Avatar", fallback = "AB", className = "" }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--accent-3)] select-none ${sizeClasses[size]} ${className}`}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        className="flex items-center justify-center w-full h-full font-medium text-[var(--accent-11)]"
        delayMs={src ? 600 : 0}
      >
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
