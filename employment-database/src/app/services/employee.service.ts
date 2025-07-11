export class EmployeeService {
    private employees: Employee[] = [];

    getEmployees(): Employee[] {
        return this.employees;
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }
}