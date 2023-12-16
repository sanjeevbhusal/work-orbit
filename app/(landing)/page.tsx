import { Button } from "@/components/ui/button";
import { cn, headingFont } from "@/lib/utils";
import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { NavBar } from "./_components/navBar";
import { Footer } from "./_components/footer";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div className="h-full bg-slate-50">
      <NavBar />
      <div className="flex flex-col items-center pt-8">
        <div
          className={cn(
            "flex items-center gap-2 p-4 uppercase bg-yellow-200 border rounded-full w-fit",
            headingFont.className
          )}
        >
          <Medal />
          <p># 1 Project Management</p>
        </div>
        <h1
          className={cn(
            "max-w-xl px-6 mt-8 text-4xl font-bold text-center md:px-0",
            headingFont.className
          )}
        >
          WorkOrbit helps you manage your entire organization&apos;s work
        </h1>
        <h2
          className={cn(
            "max-w-xl px-6 mt-8 text-xl text-center text-slate-700 md:px-0",
            textFont.className
          )}
        >
          Manage all your projects, collaborate with your team and reach a new
          productivity level. Designed to work from small teams to enterprise
          teams
        </h2>
        <Link href="/signup">
          <Button className="mt-6">Get WorkOrbit For Free</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
