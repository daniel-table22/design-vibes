"use client";

import { MembershipCard } from "@/components/custom/organisms/membership-card";
import { MemberBanner } from "@/components/custom/organisms/member-banner";

export default function MemberPortalHome() {
  return (
    <div className="flex flex-col items-center min-h-screen" style={{ backgroundColor: "var(--neutral-1)" }}>
      {/* Header */}
      <div
        className="w-full flex items-end justify-center pt-12 pb-5"
        style={{ backgroundColor: "#055748" }}
      >
        <span
          className="text-base font-semibold tracking-wide"
          style={{ color: "#ffffff", fontFamily: "'Quadrant Text', serif", letterSpacing: "0.04em" }}
        >
          Table 22
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6 w-full max-w-[393px] px-4 pt-12">
        {/* Welcome heading */}
        <h1
          style={{
            fontFamily: "'Quadrant Text', serif",
            fontSize: "28px",
            lineHeight: "36px",
            fontWeight: 500,
            color: "var(--accent-12)",
          }}
        >
          Welcome Ryan
        </h1>

        {/* Member Banner */}
        <MemberBanner showButton />

        {/* Current memberships */}
        <section className="flex flex-col gap-4">
          <p
            className="font-medium"
            style={{
              fontSize: "var(--font-size-3)",
              lineHeight: "var(--line-height-3)",
              color: "var(--accent-10)",
            }}
          >
            Current memberships
          </p>

          {/* Card 1: Che Fico — active, with payment error */}
          <MembershipCard
            title="Che Fico"
            subtitle="Chesee & Wine"
            imageSrc="/photos/club-hero-1.jpg"
            fulfillment="Delivery on Monday 12/13"
            cta="Pick a delivery window by 12/11"
            callout="Your credit card failed — please update your payment method"
          />

          <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />

          {/* Card 2: Che Fico — gifted, paused */}
          <MembershipCard
            title="Che Fico"
            subtitle="Chesee & Wine"
            imageSrc="/photos/club-hero-2.jpg"
            gift
            badge="Paused"
            callout="Your credit card failed — please update your payment method"
          />
        </section>

        {/* Past memberships */}
        <section className="flex flex-col gap-4 pb-12">
          <p
            className="font-medium"
            style={{
              fontSize: "var(--font-size-3)",
              lineHeight: "var(--line-height-3)",
              color: "var(--accent-10)",
            }}
          >
            Past memberships
          </p>

          {/* Domestique — cancelled */}
          <MembershipCard
            title="Domestique"
            subtitle="Wine Club"
            imageSrc="/photos/club-hero-3.jpg"
            badge="Cancelled 1/13/2025"
          />

          <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />

          {/* Slanted Door — gifted, cancelled */}
          <MembershipCard
            title="Slanted Door"
            subtitle="Supper Club"
            imageSrc="/photos/club-hero-4.jpg"
            gift
            badge="Cancelled 1/13/2025"
          />

          <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />

          {/* Saigon Social — cancelled + error */}
          <MembershipCard
            title="Saigon Social"
            subtitle="Chesee & Wine"
            imageSrc="/photos/club-hero-5.jpg"
            badge="Cancelled 1/13/2025"
            callout="Your credit card failed — please update your payment method"
          />
        </section>
      </div>
    </div>
  );
}
