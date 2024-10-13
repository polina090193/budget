import { NextApiRequest, NextApiResponse } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: NextApiRequest, res: NextApiResponse, { params }: { params: { id: number } }) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session?.user?.id) {
    return new Response("Authorization error.", {
      status: 401,
    });
  }
  
  const { id } = params;
  
  const category = await query(`SELECT * FROM ${table_names.categories} WHERE category_id = ?`, [id]);
  
  if (!category) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(category, {
    status: 200,
  });
}
