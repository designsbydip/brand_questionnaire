import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // Check if env vars are present before creating client
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error("Missing Supabase environment variables in middleware");
      return NextResponse.next({ request });
    }

    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    const isAdminRoute = pathname.startsWith("/admin");
    const isClientRoute = pathname.startsWith("/form");
    const isAdminLogin = pathname === "/admin/login";
    const isClientLogin = pathname === "/login";

    // Admin routing
    if (isAdminRoute && !isAdminLogin) {
      if (!user) {
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }
      if (user.email !== "admin@gaudi.internal") {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    if (isAdminLogin && user && user.email === "admin@gaudi.internal") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    // Client routing
    if (isClientRoute) {
      if (!user) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    if (isClientLogin && user) {
      url.pathname = user.email === "admin@gaudi.internal" ? "/admin" : "/form/1-1";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch (error) {
    console.error("Middleware error:", error);
    // If an error occurs, just pass through instead of crashing the whole app with a 500
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/form/:path*",
    "/login"
  ],
};
