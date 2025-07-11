import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  employee = {
    name: 'John Doe',
    department: 'Engineering',
    role: 'Software Developer',
    phone: '9876543210',
    email: 'johndoe@example.com'
  };
}
