import { NextApiResponse } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url);
  
  const userId = searchParams?.get('userId') || null;
  const session = await getServerSession(authOptions);
  
  if (!session || !userId || Number(session.user.id) !== Number(userId)) {
    return new Response("Authorization error.", {
      status: 401,
    });
  }
  
  let recordsSQLQuery = `SELECT * FROM ${table_names.records} WHERE user_id = ?`;

  const params = [session.user.id];
  const categoryId = searchParams?.get('categoryId') || null;

  if (categoryId) {
    recordsSQLQuery += ' AND category_id = ?';
    params.push(categoryId);
  }

  const records = await query(recordsSQLQuery, params);

  if (!records) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(records, {
    status: 200,
  });
}
