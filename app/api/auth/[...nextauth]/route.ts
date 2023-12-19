import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/db";
import { table_names } from "@/db/table_names";
import { compareSync } from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: Record<string, string> | undefined): Promise<any> {
        if (!credentials?.email && !credentials?.password) {
          return null;
        }
        const usersArr = await query(`SELECT * FROM ${table_names.users} WHERE email = ?`, [credentials?.email]) as BudgetUserRes[];
        const user = usersArr[0];

        if (user?.password_hash) {
          const isPasswordValid = await compareSync(credentials?.password, user.password_hash);

          if (!isPasswordValid) {
            return null;
          } else {
            return {
              email: user.email,
            }
          }
        } else {
          return null;
        }
      }
    }),
  ],
  secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
