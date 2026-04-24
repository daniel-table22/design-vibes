"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import * as Switch from "@radix-ui/react-switch";
import type {
  ClubScenario,
  ClubState,
  CohortTimeline,
  CohortCadence,
  FulfillmentMethod,
  USState,
  MembershipState,
  MembershipFulfillment,
  MembershipError,
} from "./scenario-types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block font-medium uppercase tracking-wide"
      style={{ fontSize: "10px", color: "var(--accent-9)" }}
    >
      {children}
    </label>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-semibold uppercase tracking-wide"
      style={{ fontSize: "10px", color: "var(--accent-11)" }}
    >
      {children}
    </p>
  );
}

function ButtonGroup<T extends string>({
  options,
  value,
  onChange,
  nullable,
}: {
  options: T[];
  value: T | null;
  onChange: (v: T | null) => void;
  nullable?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {nullable && (
        <button
          onClick={() => onChange(null)}
          className={[
            "px-2 py-0.5 text-xs rounded border cursor-pointer transition-colors",
            value === null
              ? "bg-black text-white border-black"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
          ].join(" ")}
        >
          none
        </button>
      )}
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={[
            "px-2 py-0.5 text-xs rounded border cursor-pointer transition-colors",
            value === opt
              ? "bg-black text-white border-black"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
          ].join(" ")}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function MultiCheckbox<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T[];
  onChange: (v: T[]) => void;
}) {
  function toggle(opt: T) {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  }
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
          <Checkbox.Root
            checked={value.includes(opt)}
            onCheckedChange={() => toggle(opt)}
            className="flex items-center justify-center w-4 h-4 rounded border border-gray-300 bg-white data-[state=checked]:bg-black data-[state=checked]:border-black transition-colors"
          >
            <Checkbox.Indicator>
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-xs text-gray-600">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

function TextInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-800 focus:outline-none focus:border-gray-400"
    />
  );
}

function NumberInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-800 focus:outline-none focus:border-gray-400"
    />
  );
}

// ── Club form ─────────────────────────────────────────────────────────────────

function ClubForm({
  club,
  onChange,
}: {
  club: ClubScenario;
  onChange: (updated: ClubScenario) => void;
}) {
  function set<K extends keyof ClubScenario>(key: K, value: ClubScenario[K]) {
    onChange({ ...club, [key]: value });
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      {/* Club section */}
      <div className="flex flex-col gap-3">
        <SectionHeading>Club</SectionHeading>

        <Field label="Partner">
          <TextInput value={club.partner} onChange={(v) => set("partner", v)} />
        </Field>

        <Field label="Club name">
          <TextInput value={club.club} onChange={(v) => set("club", v)} />
        </Field>

        <Field label="Club state">
          <ButtonGroup<ClubState>
            options={["waitlist", "active", "stopped"]}
            value={club.clubState}
            onChange={(v) => v && set("clubState", v)}
          />
        </Field>

        <Field label="Cohort timeline">
          <ButtonGroup<CohortTimeline>
            options={["TBD", "announced", "cut-off", "fulfilled"]}
            value={club.cohortTimeline}
            onChange={(v) => v && set("cohortTimeline", v)}
          />
        </Field>

        <Field label="Cohort cadence">
          <ButtonGroup<CohortCadence>
            options={["monthly", "quarterly", "bi-annual"]}
            value={club.cohortCadence}
            onChange={(v) => v && set("cohortCadence", v)}
          />
        </Field>

        <Field label="Fulfillment methods">
          <MultiCheckbox<FulfillmentMethod>
            options={["delivery", "pickup", "shipping"]}
            value={club.fulfillmentMethods}
            onChange={(v) => set("fulfillmentMethods", v)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Offer main ($)">
            <NumberInput value={club.offerMain} onChange={(v) => set("offerMain", v)} />
          </Field>
          <Field label="Offer add-on ($)">
            <NumberInput value={club.offerAddon} onChange={(v) => set("offerAddon", v)} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Address 1">
            <ButtonGroup<USState>
              options={["AZ", "CA", "TN"]}
              value={club.address1}
              onChange={(v) => set("address1", v)}
              nullable
            />
          </Field>
          <Field label="Address 2">
            <ButtonGroup<USState>
              options={["AZ", "CA", "TN"]}
              value={club.address2}
              onChange={(v) => set("address2", v)}
              nullable
            />
          </Field>
        </div>
      </div>

      <hr style={{ borderColor: "var(--neutral-alpha-4)" }} />

      {/* Membership section */}
      <div className="flex flex-col gap-3">
        <SectionHeading>Membership</SectionHeading>

        <Field label="State">
          <ButtonGroup<MembershipState>
            options={["active", "paused", "skipped", "cancelled"]}
            value={club.membershipState}
            onChange={(v) => v && set("membershipState", v)}
          />
        </Field>

        <Field label="Fulfillment">
          <ButtonGroup<MembershipFulfillment>
            options={["delivery", "pick-up"]}
            value={club.membershipFulfillment}
            onChange={(v) => v && set("membershipFulfillment", v)}
          />
        </Field>

        <Field label="Address">
          <MultiCheckbox<USState>
            options={["AZ", "CA", "TN"]}
            value={club.membershipAddress}
            onChange={(v) => set("membershipAddress", v)}
          />
        </Field>

        <Field label="Errors">
          <MultiCheckbox<MembershipError>
            options={["address error", "payment error"]}
            value={club.membershipErrors}
            onChange={(v) => set("membershipErrors", v)}
          />
        </Field>

        <div className="flex items-center gap-2">
          <Switch.Root
            checked={club.gifted}
            onCheckedChange={(v) => set("gifted", v)}
            className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200"
          >
            <Switch.Thumb className="block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-0.5" />
          </Switch.Root>
          <span className="text-xs text-gray-600">Gifted</span>
        </div>
      </div>
    </div>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────────

interface ScenarioPanelProps {
  open: boolean;
  clubs: ClubScenario[];
  openClubId: string | null;
  onOpenClubChange: (id: string | null) => void;
  onClubChange: (updated: ClubScenario) => void;
  onClose: () => void;
}

export default function ScenarioPanel({
  open,
  clubs,
  openClubId,
  onOpenClubChange,
  onClubChange,
  onClose,
}: ScenarioPanelProps) {
  return (
    <div
      className="fixed top-0 right-0 h-full z-50 flex flex-col bg-white shadow-2xl transition-transform duration-300"
      style={{
        width: "380px",
        transform: open ? "translateX(0)" : "translateX(100%)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ borderColor: "var(--neutral-alpha-4)" }}
      >
        <span className="text-sm font-semibold" style={{ color: "var(--accent-12)" }}>
          Scenario
        </span>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Accordion list */}
      <div className="flex-1 overflow-y-auto">
        {clubs.map((club) => {
          const isOpen = openClubId === club.id;
          return (
            <div key={club.id} className="border-b" style={{ borderColor: "var(--neutral-alpha-4)" }}>
              {/* Accordion trigger */}
              <button
                onClick={() => onOpenClubChange(isOpen ? null : club.id)}
                className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--accent-12)" }}>
                    {club.partner}
                  </p>
                  <p className="text-xs" style={{ color: "var(--accent-9)" }}>
                    {club.club}
                  </p>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0 transition-transform"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: "var(--accent-9)" }}
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Accordion content */}
              {isOpen && (
                <ClubForm
                  club={club}
                  onChange={onClubChange}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
