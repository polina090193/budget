import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const body = await req.json();
  
  const { record_id, date, title, direction, sum, category_id } = body;

  const valuesArr = [title, direction, sum, category_id, record_id];
  if (date) {
    valuesArr.unshift(date);
  }

  const result = await query(
    `UPDATE ${table_names.records} SET
    date = ?, title = ?, direction = ?, sum = ?, category_id = ?
    WHERE record_id = ?;`,
    [date, title, direction, sum, category_id, record_id]
  );

  if (!result) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  const updatedRecordRows = await query(`SELECT * FROM ${table_names.records} WHERE record_id = ?`, [record_id]);

  return NextResponse.json(updatedRecordRows, {
    status: 201,
  })
}
