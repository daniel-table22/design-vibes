interface MemberBannerProps {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
}

export function MemberBanner({
  heading = "Curious about what else we have?",
  body = "We've rounded up more member-exclusive experiences and offerings near you — from chef-led dinners to artisan boxes and beyond.",
  buttonLabel = "Explore our clubs",
  showButton = true,
  onButtonClick,
}: MemberBannerProps) {
  return (
    <div
      className="flex flex-col gap-[var(--spacing-2)] items-start justify-center p-[var(--spacing-4)] rounded-[var(--theme-radius-6)] w-[361px]"
      style={{ backgroundColor: "var(--color-brown-3)" }}
    >
      {/* Heading row with illustration */}
      <div className="flex gap-[12px] items-center w-full">
        <p
          className="flex-1 text-[length:var(--font-size-5)] leading-[var(--line-height-3)] min-w-0"
          style={{
            fontFamily: "'Quadrant Text', serif",
            color: "var(--color-brown-12)",
            fontWeight: 500,
          }}
        >
          {heading}
        </p>
        {/* Illustration placeholder — replace with actual image when available */}
        <div
          className="shrink-0 w-[113px] h-[64px] rounded overflow-hidden"
          style={{ backgroundColor: "var(--color-brown-4)" }}
        />
      </div>

      {/* Body */}
      <p
        className="w-full text-[length:var(--font-size-2)] leading-[var(--line-height-2)] font-normal"
        style={{ color: "var(--neutral-12)" }}
      >
        {body}
      </p>

      {/* Button */}
      {showButton && (
        <button
          onClick={onButtonClick}
          className="flex items-center justify-center h-8 px-[var(--spacing-4)] rounded-[var(--theme-radius-2)] cursor-pointer transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "var(--accent-12)",
            color: "var(--neutral-1)",
          }}
        >
          <span className="text-[length:var(--font-size-2)] leading-[var(--line-height-2)] font-medium whitespace-nowrap">
            {buttonLabel}
          </span>
        </button>
      )}
    </div>
  );
}
