import Link from 'next/link';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

function Footer() {
  return (
    <div className="p-4 bg-slate-100 border-t fixed bottom-0 w-full">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <Logo />
        <div>
          <Link href="/terms-of-service">
            <Button size={'sm'} variant="link">
              Terms of Service
            </Button>
          </Link>
          <Link href="/privacy-policy" className="ml-4">
            <Button size="sm" variant="link">
              Privacy Policy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { Footer };
