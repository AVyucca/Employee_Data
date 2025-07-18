import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

  goToAddEmployee() {
    console.log('Navigating to Add Employee...');
    this.router.navigate(['/add-entry']);  // ✅ Corrected path
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
