import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  entryForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.entryForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      joiningDate: ['', Validators.required],
      pan: ['', Validators.required],
      aadhaar: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      bankAccount: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.entryForm.valid) {
      console.log('Form submitted:', this.entryForm.value);
      alert('Record saved successfully!');
      this.entryForm.reset();
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? All data will be cleared.')) {
      this.entryForm.reset();
    }
  }
}
