import mysql from 'mysql2/promise';

export async function query(query: string, values: any[]) {
  const pool = mysql.createPool({
    host: process.env.DB_MYSQL_HOST,
    port: Number(process.env.DB_MYSQL_PORT),
    database: process.env.DB_MYSQL_DATABASE,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, values);
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    pool.end();
  }
}
