import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Employee } from "../types/Employee";
import type { EmployeesResponse } from "../types/EmployeeResponse";

export default function EmployeeDetails() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get<EmployeesResponse>("/employees");
        setEmployees(response.data.data);
      } catch (error) {
        console.log("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <h3>Loading employees...</h3>;
  }

  return (
  <div className="container mt-4">
    <h2 className="mb-3 text-primary">Employees List</h2>

    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        
        {/* HEADER */}
        <thead className="table-primary">
          <tr>
            <th>Emp ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="fs-4">
          {employees.map((emp) => (
            <tr key={emp.empId}>
              <td>{emp.empId}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.username}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>
);
}

