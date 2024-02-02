import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  const body = await req.json();
  const { record_id } = body;
  
  const deletedRecord = await query(`DELETE FROM ${table_names.records} WHERE record_id = ?`, [record_id]) as BudgetRecord[];
  
  if (!deletedRecord) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(deletedRecord, {
    status: 200,
  });
}
