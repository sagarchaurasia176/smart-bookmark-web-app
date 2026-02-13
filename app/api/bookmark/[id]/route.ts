import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "../../authenticatedUsers/route";

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
