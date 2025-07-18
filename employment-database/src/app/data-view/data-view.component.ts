import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  dataEntries: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/api/data-entry')
      .subscribe(
        (data) => {
           console.log('Fetched entries:', data);
          this.dataEntries = data;
        },
        (error) => {
          console.error('Error fetching employee data:', error);
        }
      );
  }
}
