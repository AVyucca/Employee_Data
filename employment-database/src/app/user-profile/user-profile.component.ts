import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // ✅ These are what the template needs:
  employee: any = null;
  error: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getRegisteredEmployees().subscribe({
      next: (data: any[]) => {
        if (data && data.length > 0) {
          this.employee = data[data.length - 1];  // last registered
        } else {
          this.error = 'No registered employee found.';
        }
      },
      error: (err) => {
        console.error('Error fetching registered employees:', err);
        this.error = 'Failed to load profile.';
      }
    });
  }
}
