import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  /**
   * === Employee APIs ===
   */
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, employeeData);
  }

  /**
   * === Department APIs ===
   */
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departments`);
  }

  createDepartment(departmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/departments`, departmentData);
  }

  /**
   * === Role APIs ===
   */
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  createRole(roleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/roles`, roleData);
  }

  /**
   * === EmployeeRegister APIs ===
   */
  registerEmployee(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/emp-register`, data);
  }

  getRegisteredEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/emp-register`);
  }

  /**
   * === EmployeeSalary APIs ===
   */
  getEmployeeSalaries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employeesalary`);
  }

  createEmployeeSalary(salaryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employeesalary`, salaryData);
  }
}
