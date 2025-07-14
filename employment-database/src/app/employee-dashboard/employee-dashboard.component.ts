import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  registeredEmployees: any[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  goToUserProfile(): void {
    this.router.navigate(['/user-profile']);
  }

  fetchRegisteredEmployees(): void {
    this.employeeService.getRegisteredEmployees().subscribe(
      (data:any) => {
        this.registeredEmployees = data;
        this.errorMessage = '';
      },
      (error:any) => {
        console.error('Error fetching registered employees:', error);
        this.errorMessage = 'Failed to load registered employees.';
      }
    );
  }
}
