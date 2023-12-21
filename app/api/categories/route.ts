import { NextApiRequest, NextApiResponse } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const categories = await query(`SELECT * FROM ${table_names.categories}`, []);

  if (!categories) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(categories, {
    status: 200,
  });
}
