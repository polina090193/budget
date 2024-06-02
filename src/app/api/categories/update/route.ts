// import { query } from "@/db";
// import { table_names } from "@/db/table_names";
// import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  // const body = await req.json();
  
  // const { name, direction, user_id } = body;

  // const valuesArr = [name, direction, user_id];

  // const result = await query(
  //   `UPDATE ${table_names.categories} SET
  //   date = ?, title = ?, direction = ?, sum = ?, category_id = ?
  //   WHERE record_id = ?;`,
  //   [date, title, direction, sum, category_id, record_id]
  // );

  // if (!result) {
  //   return new Response("Request failed", {
  //     status: 500,
  //   });
  // }

  // const updatedRecordRows = await query(`SELECT * FROM ${table_names.categories} WHERE record_id = ?`, [record_id]);

  // return NextResponse.json(updatedRecordRows, {
  //   status: 201,
  // })
}
