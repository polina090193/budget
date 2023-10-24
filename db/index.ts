import mysql from 'mysql2';
import 'dotenv/config';

export async function query(query: string) {
  const dbconnection = await mysql.createConnection({
    host: process.env.DB_MYSQL_HOST,
    port: Number(process.env.DB_MYSQL_PORT),
    database: process.env.DB_MYSQL_DATABASE,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
  });

  dbconnection.connect(function(err) {
    if (err) throw err;
  });

  const [results] = await dbconnection.promise().query(query);

  dbconnection.end();

  return results;
}
