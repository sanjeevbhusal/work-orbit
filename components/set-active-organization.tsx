'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useOrganizationList } from '@clerk/nextjs';

function SetActiveOrganization() {
  const { setActive } = useOrganizationList();
  const { organizationId } = useParams();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: organizationId as string,
    });
  }, [setActive, organizationId]);

  return <></>;
}

export { SetActiveOrganization };
