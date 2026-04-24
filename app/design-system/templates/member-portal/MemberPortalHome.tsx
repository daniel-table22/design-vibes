"use client";

import { MemberClubCard } from "@/components/custom/organisms/member-club-card";
import { MemberBanner } from "@/components/custom/organisms/member-banner";
import type { ClubScenario } from "@/app/prototypes/member-portal/scenario-types";
import { deriveCardProps } from "@/app/prototypes/member-portal/derive-card-props";

interface MemberPortalHomeProps {
  clubs?: ClubScenario[];
}

export default function MemberPortalHome({ clubs }: MemberPortalHomeProps = {}) {
  const currentClubs = clubs?.filter((c) => c.membershipState !== "cancelled");
  const pastClubs = clubs?.filter((c) => c.membershipState === "cancelled");
  return (
    <div className="flex flex-col items-center min-h-screen" style={{ backgroundColor: "var(--neutral-1)" }}>
      {/* Header */}
      <div
        className="w-full flex items-end justify-center pt-12 pb-5"
        style={{ backgroundColor: "var(--accent-11)" }}
      >
        <span
          className="text-base font-semibold tracking-wide"
          style={{ color: "var(--token-accent-contrast)", fontFamily: "var(--font-quadrant)", letterSpacing: "0.04em" }}
        >
          Table 22
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6 w-full max-w-[393px] px-4 pt-12">
        {/* Welcome heading */}
        <h1
          style={{
            fontFamily: "var(--font-quadrant)",
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
        {(currentClubs === undefined || currentClubs.length > 0) && (
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

            {currentClubs === undefined ? (
              <>
                <MemberClubCard
                  title="Che Fico"
                  subtitle="Chesee & Wine"
                  imageSrc="/photos/club-hero-1.jpg"
                  fulfillment="Delivery on Monday 12/13"
                  cta="Pick a delivery window by 12/11"
                  callout="Your credit card failed — please update your payment method"
                />
                <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />
                <MemberClubCard
                  title="Che Fico"
                  subtitle="Chesee & Wine"
                  imageSrc="/photos/club-hero-2.jpg"
                  gift
                  badge="Paused"
                  callout="Your credit card failed — please update your payment method"
                />
              </>
            ) : (
              currentClubs.map((club, i) => (
                <div key={club.id} className="flex flex-col gap-4">
                  {i > 0 && <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />}
                  <MemberClubCard {...deriveCardProps(club)} />
                </div>
              ))
            )}
          </section>
        )}

        {/* Past memberships */}
        {(pastClubs === undefined || pastClubs.length > 0) && (
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

            {pastClubs === undefined ? (
              <>
                <MemberClubCard
                  title="Domestique"
                  subtitle="Wine Club"
                  imageSrc="/photos/club-hero-3.jpg"
                  badge="Cancelled 1/13/2025"
                />
                <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />
                <MemberClubCard
                  title="Slanted Door"
                  subtitle="Supper Club"
                  imageSrc="/photos/club-hero-4.jpg"
                  gift
                  badge="Cancelled 1/13/2025"
                />
                <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />
                <MemberClubCard
                  title="Saigon Social"
                  subtitle="Chesee & Wine"
                  imageSrc="/photos/club-hero-5.jpg"
                  badge="Cancelled 1/13/2025"
                  callout="Your credit card failed — please update your payment method"
                />
              </>
            ) : (
              pastClubs.map((club, i) => (
                <div key={club.id} className="flex flex-col gap-4">
                  {i > 0 && <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />}
                  <MemberClubCard {...deriveCardProps(club)} />
                </div>
              ))
            )}
          </section>
        )}
      </div>
    </div>
  );
}
