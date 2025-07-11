import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHubPageComponent } from './employee-hub-page.component';

describe('EmployeeHubPageComponent', () => {
  let component: EmployeeHubPageComponent;
  let fixture: ComponentFixture<EmployeeHubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeHubPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
