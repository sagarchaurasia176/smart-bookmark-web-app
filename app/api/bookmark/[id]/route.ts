import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Helper function to get authenticated user
export async function getAuthenticatedUser() {
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          message: "Bookmark ID is required",
          status: 400,
        },
        { status: 400 },
      );
    }

    // Delete the bookmark permanently, ensuring it belongs to the authenticated user
    const deletedBookmark = await prisma.bookmark.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });

    return NextResponse.json({
      message: "Bookmark deleted successfully",
      data: deletedBookmark,
      status: 200,
    });
  } catch (er) {
    return NextResponse.json(
      {
        message: "Error while deleting the bookmark",
        status: 500,
      },
      { status: 500 },
    );
  }
}


//req:the deleted data get from the db 
