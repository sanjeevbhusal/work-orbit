import { cn, headingFont } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  hideText?: boolean;
}

function Logo({ hideText }: LogoProps) {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <Image src="/logo.svg" alt="Logo" height={40} width={40} />
      {hideText ? null : (
        <p className={cn("text-xl font-semibold", headingFont.className)}>
          WorkOrbit
        </p>
      )}
    </Link>
  );
}

export { Logo };
