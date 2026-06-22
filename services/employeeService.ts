import { getConnection } from "@/lib/db";

export async function getEmployees() {
  const db = await getConnection();
  const result = await db.request().query(
    "SELECT * FROM Employees ORDER BY Id DESC"
  );
  return result.recordset;
}

export async function createEmployee(
  firstName: string,
  lastName: string,
  email: string
) {
  const db = await getConnection();

  await db.request()
    .input("firstName", firstName)
    .input("lastName", lastName)
    .input("email", email)
    .query(`
      INSERT INTO Employees (FirstName, LastName, Email)
      VALUES (@firstName, @lastName, @email)
    `);
}