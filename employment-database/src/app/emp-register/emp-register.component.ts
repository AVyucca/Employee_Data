import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emp-register',
  templateUrl: './emp-register.component.html',
  styleUrls: ['./emp-register.component.css']
})
export class EmpRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', Validators.required],
      joiningDate: ['', Validators.required],
      pan: ['', Validators.required],
      aadhaar: ['', Validators.required],
      bankAccount: [''],  // Optional
      department: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.http.post('http://localhost:5000/api/emp-register', this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log('Registered:', response);
          alert('Employee registered successfully!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Error registering employee.');
        }
      });
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
