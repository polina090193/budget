import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Authorization error.", {
      status: 401,
    });
  }

  // const reportByCategorySQLQuery = `
  // SELECT category_id, category_name, COUNT(*) as count
  // FROM ${table_names.records} 
  // WHERE user_id = ?
  // GROUP BY category_id
  // ORDER BY category_id ASC 
  // `;

  const reportByCategorySQLQuery = `
  SELECT 
    ${table_names.records}.category_id, 
    ${table_names.categories}.name,  -- Specify the table for the name column
    COUNT(*) as count
  FROM ${table_names.records}
  INNER JOIN ${table_names.categories} 
    ON ${table_names.records}.category_id = ${table_names.categories}.category_id 
    GROUP BY ${table_names.records}.category_id, ${table_names.categories}.name
    ORDER BY ${table_names.records}.category_id ASC;
    `;
    // WHERE user_id = ?

  const report = await query(reportByCategorySQLQuery, [session.user.id]);

  if (!report) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json({ report }, {
    status: 200,
  });
}
