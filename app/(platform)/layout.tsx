import QueryClientProvider from '@/providers/query-client-provider';
import { ClerkProvider } from '@clerk/nextjs';

function PlatFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </QueryClientProvider>
  );
}

export default PlatFormLayout;
