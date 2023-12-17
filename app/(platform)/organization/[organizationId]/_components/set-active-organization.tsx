"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function SetActiveOrganization() {
  const { setActive } = useOrganizationList();
  const { organizationId } = useParams();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: organizationId as string,
    });
  }, [setActive, organizationId]);

  return <>{organizationId}</>;
}

export { SetActiveOrganization };
