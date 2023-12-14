import { NextApiRequest, NextApiResponse } from 'next';
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { NextResponse } from 'next/server';

// post user to db here
// Context from Function c:/study/nextjs/budget/app/api/auth/signup/route.ts:POST
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;

  const user = await query(
    `INSERT INTO ${table_names.users} (name, email, password) VALUES (${name}, ${email}, ${password})`
  );

  if (!user) {
    return new Response("Request failed", {
      status: 500,
    });
  }

  return NextResponse.json(user, {
    status: 200,
    headers: {
      'Set-Cookie': `user=${user.user_id}; Path=/; HttpOnly; Expires=${new Date(Date.now() + 60 * 60 * 24 * 7 * 1000).toUTCString()}`
    }
  })
}


// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const categories = await query(`SELECT * FROM ${table_names.categories}`);

//   if (!categories) {
//     return new Response("Request failed", {
//       status: 500,
//     });
//   }

//   return NextResponse.json(categories, {
//     status: 200,
//   });
// }
