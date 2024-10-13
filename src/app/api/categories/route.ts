import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Authorization error." },
        { status: 401 }
      );
    }

    const categories = await query(
      `SELECT * FROM ${table_names.categories} WHERE user_id = ?`,
      [session.user.id]
    );

    if (!categories) {
      return NextResponse.json(
        { error: "Request failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}