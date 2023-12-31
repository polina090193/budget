import { NextApiResponse } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url);
  
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return new Response("Authorization error.", {
      status: 401,
    });
  }

  const categoryId = searchParams?.get('categoryId') || null;
  const page = searchParams?.get('page') || 0;
  const pageSize = searchParams?.get('pageSize') || 10;
  const offset = (Number(page) - 1) * Number(pageSize);
  
  const recordsSQLQuery = `
  SELECT * 
  FROM ${table_names.records} 
  WHERE user_id = ? 
  ${categoryId ? 'AND category_id = ?' : ''} 
  ORDER BY date DESC 
  LIMIT ${Number(pageSize)} OFFSET ${offset}
  `;

  const params = [session.user.id];
  if (categoryId) {
    params.push(Number(categoryId));
  }

  const records = await query(recordsSQLQuery, params);
  
  if (!records) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  const totalRecords = await query(`
  SELECT COUNT(*) FROM ${table_names.records} WHERE user_id = ?
  `, [session.user.id]) as {'COUNT(*)': number}[];
  

  return NextResponse.json({records, total: totalRecords[0]['COUNT(*)']}, {
    status: 200,
  });
}
