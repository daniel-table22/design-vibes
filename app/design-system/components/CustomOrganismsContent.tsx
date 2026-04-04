"use client";

import ComponentShowcase from "./ComponentShowcase";
import { MembershipCard } from "@/components/custom/organisms/membership-card";
import { MemberBanner } from "@/components/custom/organisms/member-banner";

export default function CustomOrganismsContent() {
  return (
    <div>
      <ComponentShowcase
        name="Membership Card"
        defaultProps={{ gift: false, fulfillment: true, cta: true, badge: false, callout: false }}
        controls={[
          { type: "toggle", label: "Gift label", key: "gift" },
          { type: "toggle", label: "Fulfillment", key: "fulfillment" },
          { type: "toggle", label: "CTA", key: "cta" },
          { type: "toggle", label: "Badge", key: "badge" },
          { type: "toggle", label: "Callout", key: "callout" },
        ]}
        render={(props) => (
          <MembershipCard
            imageSrc="/photos/club-hero-1.jpg"
            gift={props.gift as boolean}
            fulfillment={props.fulfillment ? "Delivery on Monday 12/13" : undefined}
            cta={props.cta ? "Pick a delivery window by 12/11" : undefined}
            badge={props.badge ? "Cancelled 1/13/2025" : undefined}
            callout={props.callout ? "Payment failed — please update your card" : undefined}
          />
        )}
      />

      <ComponentShowcase
        name="Member Banner"
        defaultProps={{ showButton: true }}
        controls={[
          { type: "toggle", label: "Button", key: "showButton" },
        ]}
        render={(props) => (
          <MemberBanner
            showButton={props.showButton as boolean}
          />
        )}
      />
    </div>
  );
}
