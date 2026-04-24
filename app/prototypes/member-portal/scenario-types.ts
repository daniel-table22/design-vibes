export type ClubState = "waitlist" | "active" | "stopped";
export type CohortTimeline = "TBD" | "announced" | "cut-off" | "fulfilled";
export type CohortCadence = "monthly" | "quarterly" | "bi-annual";
export type FulfillmentMethod = "delivery" | "pickup" | "shipping";
export type USState = "AZ" | "CA" | "TN";
export type MembershipState = "active" | "paused" | "skipped" | "cancelled";
export type MembershipFulfillment = "pick-up" | "delivery";
export type MembershipError = "address error" | "payment error";

export interface ClubScenario {
  id: string;
  imageSrc: string;
  // Club fields
  partner: string;
  club: string;
  clubState: ClubState;
  cohortTimeline: CohortTimeline;
  cohortCadence: CohortCadence;
  fulfillmentMethods: FulfillmentMethod[];
  offerMain: number;
  offerAddon: number;
  address1: USState | null;
  address2: USState | null;
  // Membership fields
  membershipState: MembershipState;
  membershipFulfillment: MembershipFulfillment;
  membershipAddress: USState[];
  membershipErrors: MembershipError[];
  gifted: boolean;
}
