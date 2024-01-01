import { cn } from '@/lib/utils';

function PageSubheading({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('text-sm text-gray-500', className)}>{children}</h2>;
}

export { PageSubheading };
