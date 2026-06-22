"use client";

import { useCallback, useEffect, useState } from "react";

type Employee = {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  CreatedAt: string;
};

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const fetchEmployees = useCallback(async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();

    setEmployees(data);
  }, []);

  async function addEmployee(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      firstName: "",
      lastName: "",
      email: "",
    });

    await fetchEmployees();
  }

  async function deleteEmployee(id: number) {
    await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });

    await fetchEmployees();
  }

  async function updateEmployee(emp: Employee) {
    const email = prompt("New email:", emp.Email);

    if (!email) return;

    await fetch(`/api/employees/${emp.Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: emp.FirstName,
        lastName: emp.LastName,
        email,
      }),
    });

    await fetchEmployees();
  }

  useEffect(() => {
    async function loadEmployees() {
      setLoading(true);

      await fetchEmployees();

      setLoading(false);
    }

    loadEmployees();
  }, [fetchEmployees]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Employee Admin Dashboard
      </h1>

      <form onSubmit={addEmployee} className="flex gap-2 mb-6">
        <input
          placeholder="First Name"
          className="border p-2"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <input
          placeholder="Last Name"
          className="border p-2"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button className="bg-blue-500 text-white px-4">
          Add
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">First</th>
              <th className="border p-2">Last</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.Id} className="text-center">
                <td className="border p-2">{emp.Id}</td>
                <td className="border p-2">{emp.FirstName}</td>
                <td className="border p-2">{emp.LastName}</td>
                <td className="border p-2">{emp.Email}</td>
                <td className="border p-2">
                  <button
                    onClick={() => updateEmployee(emp)}
                    className="bg-yellow-500 px-2 py-1 text-white mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(emp.Id)}
                    className="bg-red-500 px-2 py-1 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}