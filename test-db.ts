import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import sql from "mssql";

async function test() {
  try {
    console.log("ENV:", {
      server: process.env.DB_SERVER,
      user: process.env.DB_USER,
      db: process.env.DB_NAME,
    });

    await sql.connect({
      server: process.env.DB_SERVER!,
      database: process.env.DB_NAME!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    });

    console.log("DB Connected Successfully");
  } catch (err) {
    console.log("DB Connection Failed", err);
  }
}

test();