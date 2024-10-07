import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Function to handle GET request
export async function GET() {
  try {
    // Fetch session using NextAuth in app directory
    const session = await getServerSession(authOptions);

    // If session or user ID is missing, return an authorization error
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Authorization error." },
        { status: 401 }
      );
    }

    // Query categories from the database using the user ID
    const categories = await query(
      `SELECT * FROM ${table_names.categories} WHERE user_id = ?`,
      [session.user.id]
    );

    // If no categories found, return an empty array
    if (!categories) {
      return NextResponse.json(
        { error: "Request failed" },
        { status: 500 }
      );
    }

    // If successful, return the categories as a JSON response
    return NextResponse.json(categories);
  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}