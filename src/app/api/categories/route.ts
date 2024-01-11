import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Authorization error.", {
      status: 401,
    });
  }

  const categories = await query(`
  SELECT * FROM ${table_names.categories}
  WHERE user_id = ?
  `, [session.user.id]);

  if (!categories) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(categories, {
    status: 200,
  });
}
