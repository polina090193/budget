import { NextApiRequest } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: { params: { id: number } }) {
  const { id } = params;
  
  const category = await query(`SELECT * FROM ${table_names.categories} WHERE category_id = ?`, [id]);
  
  if (!category) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(category, {
    status: 200,
  });
}
