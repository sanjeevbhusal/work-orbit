import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import localFont from "next/font/local";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const headingFont = localFont({
  src: "../public/font.woff2",
});

export { cn, headingFont };
