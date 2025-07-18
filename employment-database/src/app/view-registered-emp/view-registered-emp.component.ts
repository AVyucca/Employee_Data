import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-registered-emp',
  templateUrl: './view-registered-emp.component.html',
  styleUrls: ['./view-registered-emp.component.css']
})
export class ViewRegisteredEmpComponent implements OnInit {
  employees: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.http.get<any[]>('http://localhost:5000/api/emp-register')  // ✅ Corrected endpoint
      .subscribe({
        next: (data) => this.employees = data,
        error: (err) => console.error('Error fetching registered employees:', err)
      });
  }
}
