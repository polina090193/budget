import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { name, email, password_hash } = body;

  const user = await query(
    `INSERT INTO ${table_names.users} (name, email, password_hash) VALUES (?, ?, ?)`,
    [name, email, password_hash]
  );

  // const userId = await query(`SELECT user_id FROM ${table_names.users} WHERE email = ${email}`);

  if (!user) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json({}, {
    status: 201,
    // headers: {
    //   'Set-Cookie': `user=${userId}; Path=/; HttpOnly; Expires=${new Date(Date.now() + 60 * 60 * 24 * 7 * 1000).toUTCString()}`
    // },
  })
}
