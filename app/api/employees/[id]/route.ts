import { NextResponse } from "next/server";
import * as sql from "mssql";
import { getConnection } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const db = await getConnection();

  const result = await db
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Employees WHERE EmployeeId = @id");

  return NextResponse.json(result.recordset[0] || null);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const db = await getConnection();

  await db
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM Employees WHERE EmployeeId = @id");

  return NextResponse.json({ message: "Employee deleted" });
}