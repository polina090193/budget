import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // try {
    const body = await req.json();
    const { date, title, direction, sum, category, user_id } = body;

    const valuesArr = [title, direction, sum, category, user_id];
    if (date) {
      valuesArr.unshift(date);
    }

    const newRecord = await query(
      `INSERT INTO ${table_names.records} (${date ? 'date, ' : ''} title, direction, sum, category_id, user_id) VALUES (${date ? '?, ' : ''} ?, ?, ?, ?, ?)`,
      valuesArr
    );

  if (!newRecord) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json('Record created', {
    status: 201,
  })

  //   if (Array.isArray(newRecord) && newRecord.length > 0) {
  //     // Assuming newRecord contains the inserted record data
  //     return new Response("Record created", {
  //       status: 201,
  //     });
  //   } else {
  //     return new Response("No record found", {
  //       status: 404,
  //     });
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  //   return new Response("Internal server error", {
  //     status: 500,
  //   });
  // }

}
