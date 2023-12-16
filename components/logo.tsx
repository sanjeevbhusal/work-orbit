import { cn, headingFont } from "@/lib/utils";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex gap-2">
      <Image src="/logo.svg" alt="Logo" height={30} width={30} />
      <p className={cn("text-xl font-semibold", headingFont.className)}>
        WorkOrbit
      </p>
    </div>
  );
}

export { Logo };
