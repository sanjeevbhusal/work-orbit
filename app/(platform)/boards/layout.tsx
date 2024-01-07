import { Metadata } from 'next';

import { SetActiveOrganization } from '../../../components/set-active-organization';

export const metadata: Metadata = {
  title: {
    template: `%s | WorkOrbit`,
    default: 'Boards',
  },
};

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* TODO: find a better way to set active organization. */}
      <SetActiveOrganization />
      {children}
    </>
  );
}
