import { NextApiRequest } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: { params: { id: number } }) {
  const { id } = params;
  
  const [record] = await query(`SELECT * FROM ${table_names.records} WHERE record_id = ?`, [id]) as BudgetRecord[];
  
  if (!record) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(record, {
    status: 200,
  });
}
