import { ClerkProvider } from "@clerk/nextjs";

function PlatFormLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default PlatFormLayout;
