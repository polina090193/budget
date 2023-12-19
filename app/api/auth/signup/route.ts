import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { name, email, password_hash } = body;

  const existingUser = await query(
    `SELECT * FROM ${table_names.users} WHERE email = ?`,
    [email]
  ) as BudgetUserRes[];

  if (existingUser?.length > 0) {
    return new Response("User with this email already exists", {
      status: 409,
    });
  }

  const user = await query(
    `INSERT INTO ${table_names.users} (name, email, password_hash) VALUES (?, ?, ?)`,
    [name, email, password_hash]
  );

  if (!user) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json({}, {
    status: 201,
  })
}
