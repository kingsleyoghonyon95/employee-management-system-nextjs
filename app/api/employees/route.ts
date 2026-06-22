import { NextResponse } from "next/server";
import { getEmployees, createEmployee } from "@/services/employeeService";

export async function GET() {
  try {
    const data = await getEmployees();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email } = await req.json();

    await createEmployee(firstName, lastName, email);

    return NextResponse.json({ message: "Employee created" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}