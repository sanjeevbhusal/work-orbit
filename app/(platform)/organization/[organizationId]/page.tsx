import { redirect } from "next/navigation";

interface Params {
  params: {
    organizationId: string;
  };
}

export default function Page({ params: { organizationId } }: Params) {
  return redirect(`/organization/${organizationId}/boards`);
}
