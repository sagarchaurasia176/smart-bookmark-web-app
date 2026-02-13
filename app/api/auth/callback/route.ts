import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({
              name,
              value,
              ...options,
              maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      },
    );

    // Exchange the code for a session - THIS IS CRITICAL
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      //Then update the users model also
      return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
    }
  }

  // If no code or error, redirect to home
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
