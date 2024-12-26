import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: Request, { params }: { params: { id: number } } ) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Authorization error.' }, 
      { status: 401 }
    );
  }
  
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid ID parameter.' }, { status: 400 });
  }

  try {
    const [record] = await query(
      `SELECT * FROM ${table_names.records} WHERE record_id = ?`,
      [id]
    ) as BudgetRecord[];

    if (!record) {
      return NextResponse.json({ error: 'Record not found.' }, { status: 404 });
    }

    return NextResponse.json(record, { status: 200 });
    
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
