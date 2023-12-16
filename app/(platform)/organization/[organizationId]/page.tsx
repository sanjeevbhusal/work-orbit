interface OrganizationPageProps {
  params: {
    organizationId: string;
  };
}

export default function OrganizationPage({
  params: { organizationId },
}: OrganizationPageProps) {
  return <div>Organization Id: {organizationId}</div>;
}
