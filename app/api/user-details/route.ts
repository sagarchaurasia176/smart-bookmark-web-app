import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // Get the authenticated user from Supabase
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
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { status: 401, error: "Unauthorized - No user logged in" },
        { status: 401 }
      );
    }

    // Now fetch the user data from your Prisma database using the authenticated user's ID
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,  // Use the authenticated user's ID
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { status: 404, error: "User not found in database" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      status: 200, 
      message: "Success", 
      user: userData 
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        status: 500,
        error: "Internal server error while getting the data from the db",
      },
      { status: 500 }
    );
  }
}