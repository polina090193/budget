import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Authorization error.", {
      status: 401,
    });
  }
  const { searchParams } = new URL(req.url);

  const type = searchParams?.get('type') || null;

  const reportByCategorySQLQuery = `
  SELECT 
    ${table_names.records}.category_id, 
    ${table_names.categories}.name,
    SUM(${table_names.records}.sum) as sum

  FROM ${table_names.records}
  INNER JOIN ${table_names.categories} 
    ON ${table_names.records}.category_id = ${table_names.categories}.category_id 

  WHERE ${table_names.records}.user_id = ? 
    AND ${table_names.categories}.user_id = ?
    ${type ? `AND ${table_names.categories}.type = ?` : ''}
    ${type ? `AND ${table_names.records}.type = ?` : ''}

  GROUP BY ${table_names.records}.category_id, ${table_names.categories}.name
  ORDER BY ${table_names.records}.category_id ASC;
  `;

  const params = [session.user.id, session.user.id];
  if (type) {
    params.push(...[type, type]);
  }

  const report = await query(reportByCategorySQLQuery, params);

  if (!report) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json({ report }, {
    status: 200,
  });
}
