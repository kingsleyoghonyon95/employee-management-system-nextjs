import * as sql from "mssql";

const config = {
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  return await sql.connect(config);
}