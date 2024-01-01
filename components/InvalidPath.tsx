import Link from 'next/link';

import { Button } from './ui/button';

function InvalidPath() {
  return (
    <div className="h-full px-4 ">
      <div className="flex items-center justify-center mt-12 flex-col max-w-xl mx-auto gap-4">
        <h1 className="font-bold text-lg"> Invalid URL </h1>
        <p className="text-neutral-700 text-lg text-center">
          The current link is not a valid path in the WorkOrbit. Please make sure you didnot change the link yourself.
        </p>
        <Link href="/">
          <Button variant={'primary'}>Go Back to Home Page</Button>
        </Link>
      </div>
    </div>
  );
}

export { InvalidPath };
