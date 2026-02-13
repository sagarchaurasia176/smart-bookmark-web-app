import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Helper function to get authenticated user
async function getAuthenticatedUser() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

// post req - for creating the bookmark and update into the db
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized - Please login",
          status: 401,
        },
        { status: 401 },
      );
    }

    const { url, title } = await request.json();

    if (!url || !title) {
      return NextResponse.json(
        {
          message: "URL and title are required",
          status: 400,
        },
        { status: 400 },
      );
    }

    // Create the entry in the db with authenticated user's ID
    const bookmarks = await prisma.bookmark.create({
      data: {
        url: url,
        title: title,
        userId: user.id, // Use authenticated user's ID
      },
    });

    return NextResponse.json({
      message: "Bookmark created successfully",
      bookmarks,
    });
  } catch (er) {
    return NextResponse.json(
      {
        message: "Error while creating the bookmark",
        status: 500,
      },
      { status: 500 },
    );
  }
}

// Retrieved the bookmark from the db - filtered by authenticated user
export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized - Please login",
          status: 401,
        },
        { status: 401 },
      );
    }

    // Only fetch bookmarks for the authenticated user
    const bookmarkGets = await prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      data: bookmarkGets,
      status: 200,
    });
  } catch (er) {
    return NextResponse.json(
      {
        message: "Error while fetching the data",
        status: 500,
      },
      { status: 500 },
    );
  }
}

{
  /* Description  ai work pending*/
}
{
  /* {bookmark.description && (
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {bookmark.description}
                  </p>
                )} */
}
