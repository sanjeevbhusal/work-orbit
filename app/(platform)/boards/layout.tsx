import { SetActiveOrganization } from '../../../components/set-active-organization';

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* TODO: find a better way to set active organization. */}
      <SetActiveOrganization />
      {children}
    </>
  );
}
