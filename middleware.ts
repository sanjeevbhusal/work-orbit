import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth({ userId, isPublicRoute, orgId }, req) {
    // Handle users who aren't authenticated and try to view the protected page

    if (!userId && !isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Handle user who are authenticated and have a organization.
    if (userId && isPublicRoute) {
      let path = "/select-organization";
      if (orgId) {
        path = "/boards";
      }
      return NextResponse.redirect(new URL(path, req.url));
    }

    // Handle user who are authenticated, but donot have a organization.
    if (userId && !orgId && !req.url.includes("/select-organization")) {
      return NextResponse.redirect(new URL(`/select-organization`, req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
