import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisteredEmpComponent } from './view-registered-emp.component';

describe('ViewRegisteredEmpComponent', () => {
  let component: ViewRegisteredEmpComponent;
  let fixture: ComponentFixture<ViewRegisteredEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegisteredEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegisteredEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
