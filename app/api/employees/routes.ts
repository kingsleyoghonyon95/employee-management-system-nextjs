import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query(
    "SELECT * FROM Employees ORDER BY Id DESC"
  );

  return NextResponse.json(result.recordset);
}

export async function POST(req: Request) {
  const { firstName, lastName, email } = await req.json();

  const pool = await getConnection();

  await pool.request()
    .input("firstName", firstName)
    .input("lastName", lastName)
    .input("email", email)
    .query(`
      INSERT INTO Employees (FirstName, LastName, Email)
      VALUES (@firstName, @lastName, @email)
    `);

  return NextResponse.json({ message: "Created" });
}