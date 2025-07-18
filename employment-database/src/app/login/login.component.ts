import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      role: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log('Sending to backend:', loginData);

    // Use special route for Emily
    const loginUrl = this.loginForm.value.email === 'emily@yuccasolutions.com'
      ? 'http://localhost:5000/api/test-emily-login'
      : 'http://localhost:5000/api/emp-login';

    this.http.post<any>(loginUrl, loginData).subscribe({
      next: res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        alert('Login successful');

        // Redirect based on selected role
        const role = this.loginForm.value.role;
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'employee') {
          this.router.navigate(['/employee-dashboard']);
        } else {
          console.error('Unknown role selected');
        }
      },
      error: err => {
        alert('Login failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
