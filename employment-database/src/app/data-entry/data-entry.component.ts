import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  entryForm!: FormGroup;  // ✅ Add exclamation to fix error

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.entryForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', Validators.required],
      joining_date: ['', Validators.required],
      pan: ['', Validators.required],
      aadhaar: ['', Validators.required],
      bank_account: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.entryForm.valid) {
      this.http.post('http://localhost:5000/api/data-entry', this.entryForm.value).subscribe({
        next: res => {
          alert('Employee added successfully!');
          this.entryForm.reset();
        },
        error: err => {
          console.error('Error:', err);
          alert('Error occurred while adding employee.');
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
