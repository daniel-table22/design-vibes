"use client";

import { useState } from "react";
import MemberPortalHome from "@/app/design-system/templates/member-portal/MemberPortalHome";
import FAB from "./FAB";
import ScenarioPanel from "./ScenarioPanel";
import { defaultClubs } from "./default-clubs";
import type { ClubScenario } from "./scenario-types";

export default function MemberPortalPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [clubs, setClubs] = useState<ClubScenario[]>(defaultClubs);
  const [openClubId, setOpenClubId] = useState<string | null>(null);

  function handleClubChange(updated: ClubScenario) {
    setClubs((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  return (
    <div className="relative">
      <MemberPortalHome clubs={clubs} />
      <FAB onClick={() => setPanelOpen(true)} />
      <ScenarioPanel
        open={panelOpen}
        clubs={clubs}
        openClubId={openClubId}
        onOpenClubChange={setOpenClubId}
        onClubChange={handleClubChange}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}
