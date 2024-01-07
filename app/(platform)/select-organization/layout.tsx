import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Select Organization',
};

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-full flex justify-center mt-16">{children}</div>;
}

export default Layout;
