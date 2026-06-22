import sql from "mssql";

const config = {
  server: "localhost\\SQLEXPRESS",
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