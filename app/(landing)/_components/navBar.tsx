import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function NavBar() {
  return (
    <div className="p-4 bg-white border-b">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <Logo />
        <div>
          <Link href="/login">
            <Button variant="outline" size={"sm"}>
              Login
            </Button>
          </Link>
          <Link href="/signup" className="ml-4">
            <Button size="sm">Get WorkOrbit For Free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { NavBar };
