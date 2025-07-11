import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  departments: any[] = [];
  roles: any[] = [];

  constructor(private employeeservice: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadDepartments();
    this.loadRoles();
  }

  loadEmployees(): void {
    this.employeeservice.getEmployees().subscribe((response:any) => {
      console.log('Employees data:', response);
      this.employees = response;
    });
  }

  loadDepartments(): void {
    this.employeeservice.getDepartments().subscribe((response:any) => {
      console.log('Departments data:', response);
      this.departments = response;
    });
  }

  loadRoles(): void {
    this.employeeservice.getRoles().subscribe((response:any) => {
      console.log('Roles data:', response);
      this.roles = response;
    });
  }

  createEmployee(): void {
    const newEmp = {
      FullName: 'John Doe',
      EmailID: 'john@example.com',
      Department: 'HR'
      // Add other fields as needed
    };

    this.employeeservice.createEmployee(newEmp).subscribe((response:any) => {
      console.log('Employee created:', response);
      this.loadEmployees();
    });
  }
}
