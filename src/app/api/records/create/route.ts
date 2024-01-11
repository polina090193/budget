import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { date, title, direction, sum, category, user_id } = body;

  const valuesArr = [title, direction, sum, category, user_id];
  if (date) {
    valuesArr.unshift(date);
  }

  const result = await query(
    `INSERT INTO ${table_names.records} (${date ? 'date, ' : ''} title, direction, sum, category_id, user_id) VALUES (${date ? '?, ' : ''} ?, ?, ?, ?, ?)`,
    valuesArr
  );

  if (!result) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  const insertedId = ('insertId' in result) ? result.insertId : undefined;

  const newRecordRows = await query(`SELECT * FROM ${table_names.records} WHERE record_id = ?`, [insertedId]);

  return NextResponse.json(newRecordRows, {
    status: 201,
  })
}
