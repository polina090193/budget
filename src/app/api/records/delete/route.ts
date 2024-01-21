import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextApiRequest } from "next";
import { NextResponse } from 'next/server';

export async function DELETE(req: NextApiRequest, { params }: { params: { id: number } }) {
  const { id } = params;
  
  const [record] = await query(`DELETE FROM ${table_names.records} WHERE record_id = ?`, [id]) as BudgetRecord[];
  
  if (!record) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(record, {
    status: 200,
  });
}
