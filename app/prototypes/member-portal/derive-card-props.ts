import type { ClubScenario } from "./scenario-types";

const ERROR_MESSAGES: Record<string, string> = {
  "payment error": "Your credit card failed — please update your payment method",
  "address error": "Your delivery address is invalid — please update it",
};

export function deriveCardProps(club: ClubScenario) {
  const isActive = club.membershipState === "active";

  // gift
  const gift = club.gifted;

  // callout — one entry per error, joined if multiple
  const callout =
    club.membershipErrors.length > 0
      ? club.membershipErrors.map((e) => ERROR_MESSAGES[e]).join("\n")
      : undefined;

  // badge
  const badge =
    club.membershipState === "paused"
      ? "Paused"
      : club.membershipState === "cancelled"
      ? "Cancelled"
      : club.membershipState === "skipped"
      ? "Skipped"
      : undefined;

  // fulfillment — active only, driven by cohort timeline
  let fulfillment: string | undefined;
  if (isActive) {
    if (club.cohortTimeline === "TBD") fulfillment = "We'll text you when we have a date";
    else if (club.cohortTimeline === "announced") fulfillment = "Delivery on Mar 13th";
    else if (club.cohortTimeline === "fulfilled") fulfillment = "We'll text you when we have a date";
    // cut-off → hide (undefined)
  }

  // cta — active + announced only
  const cta =
    isActive && club.cohortTimeline === "announced"
      ? "Select a slot by Mar 11th"
      : undefined;

  return {
    title: club.partner,
    subtitle: club.club,
    imageSrc: club.imageSrc,
    gift,
    fulfillment,
    cta,
    badge,
    callout,
  };
}
