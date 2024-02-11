import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, slug, direction, user_id } = body;

  const valuesArr = [name, slug, direction, user_id];

  const result = await query(
    `INSERT INTO ${table_names.records} (name, slug, direction, user_id) VALUES (?, ?, ?, ?)`,
    valuesArr
  );

  if (!result) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  const insertedId = ('insertId' in result) ? result.insertId : undefined;

  const newCategory = await query(`SELECT * FROM ${table_names.categories} WHERE category_id = ?`, [insertedId]);

  return NextResponse.json(newCategory, {
    status: 201,
  })
}
