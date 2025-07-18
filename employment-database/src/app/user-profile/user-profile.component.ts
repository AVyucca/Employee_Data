import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  employee: any = null;
  error: string = '';

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.employee = JSON.parse(userData);
    } else {
      this.error = 'User not logged in or session expired.';
    }
  }
}
