import { NextApiResponse } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const {searchParams} = new URL(req.url);
  const categoryId = searchParams?.get('categoryId') || null;
  
  const records = await query(`SELECT * FROM ${table_names.records}${categoryId ? ' WHERE category_id = ?' : ''}`, [categoryId]);
  
  if (!records) {
    return new Response("Request failed", {
      status: 500,
    });
  }
  return NextResponse.json(records, {
    status: 200,
  });
}
