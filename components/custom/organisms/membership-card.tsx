interface MembershipCardProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  gift?: boolean;
  fulfillment?: string;
  cta?: string;
  badge?: string;
  callout?: string;
}

export function MembershipCard({
  title = "Title",
  subtitle = "Supper Club",
  imageSrc,
  gift = false,
  fulfillment = "Delivery on Monday 12/13",
  cta = "Pick a delivery window by 12/11",
  badge,
  callout,
}: MembershipCardProps) {
  return (
    <div className="flex flex-col gap-[var(--spacing-2)] items-start w-[369px]">
      {/* Main row */}
      <div className="flex gap-[var(--spacing-3)] items-start w-full">
        {/* Image */}
        <div className="relative shrink-0 w-[104px] min-h-[104px] self-stretch rounded-[var(--theme-radius-4)] overflow-hidden shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1),0px_3px_12px_0px_rgba(0,0,0,0.1),0px_2px_3px_0px_rgba(0,0,51,0.06)]">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[var(--neutral-3)]" />
          )}
          {gift && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-[var(--spacing-1)] pt-12 px-[var(--spacing-2)] bg-gradient-to-t from-[#232300cc] to-transparent">
              <p className="text-white text-[length:var(--font-size-1)] leading-[var(--line-height-1)] font-normal whitespace-nowrap">
                Gifted
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-start justify-between min-w-0 self-stretch">
          <div className="flex flex-col items-start w-full pb-[var(--spacing-2)]">
            <p className="w-full text-[length:var(--font-size-3)] leading-[var(--line-height-3)] text-[var(--neutral-12)]" style={{ fontFamily: "'Quadrant Text', serif" }}>
              {title}
            </p>
            <p className="w-full text-[length:var(--font-size-2)] leading-[var(--line-height-2)] text-[var(--neutral-alpha-11)] font-normal">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col items-start w-full">
            {fulfillment && (
              <p className="text-[length:var(--font-size-2)] leading-[var(--line-height-2)] text-[var(--neutral-alpha-11)] font-normal whitespace-nowrap">
                {fulfillment}
              </p>
            )}
            {cta && (
              <p className="text-[length:var(--font-size-2)] leading-[var(--line-height-2)] text-[var(--accent-10)] font-medium whitespace-nowrap">
                {cta}
              </p>
            )}
          </div>

          {badge && (
            <div className="flex items-center gap-[6px] bg-[var(--neutral-alpha-3)] px-[var(--spacing-2)] py-[var(--spacing-1)] rounded-[var(--theme-radius-2)] mt-[var(--spacing-1)]">
              <p className="text-[length:var(--font-size-1)] leading-[var(--line-height-1)] text-[var(--neutral-alpha-11)] font-medium whitespace-nowrap">
                {badge}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error callout */}
      {callout && (
        <div className="flex gap-[var(--spacing-2)] items-start w-full bg-[var(--theme-error-3)] p-[var(--spacing-3)] rounded-[var(--theme-radius-3)]">
          <p className="flex-1 text-[length:var(--font-size-2)] leading-[var(--line-height-2)] text-[var(--theme-error-11)] font-medium">
            {callout}
          </p>
        </div>
      )}
    </div>
  );
}
