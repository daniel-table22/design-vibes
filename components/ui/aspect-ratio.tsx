import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const ratioMap = {
  "16:9": 16 / 9,
  "1:1": 1,
  "2:3": 2 / 3,
};

interface AspectRatioProps {
  ratio?: "16:9" | "1:1" | "2:3";
  children?: React.ReactNode;
  width?: number;
}

export function AspectRatio({ ratio = "16:9", children, width = 200 }: AspectRatioProps) {
  return (
    <div style={{ width }} className="overflow-hidden rounded-[var(--radius-4)] shadow-[0px_12px_32px_-16px_rgba(0,0,51,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)]">
      <AspectRatioPrimitive.Root ratio={ratioMap[ratio]}>
        {children ?? (
          <div className="size-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400" />
        )}
      </AspectRatioPrimitive.Root>
    </div>
  );
}
