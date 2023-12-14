import { NextApiRequest, NextApiResponse } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;

  const user = await query(
    `INSERT INTO ${table_names.users} (name, email, password) VALUES (${name}, ${email}, ${password})`
  );

  const userId = await query(`SELECT user_id FROM ${table_names.users} WHERE email = ${email}`);

  if (!user) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(user, {
    status: 200,
    headers: {
      'Set-Cookie': `user=${userId}; Path=/; HttpOnly; Expires=${new Date(Date.now() + 60 * 60 * 24 * 7 * 1000).toUTCString()}`
    },
  })
}
