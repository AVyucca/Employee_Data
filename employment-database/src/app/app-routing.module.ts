import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { DataViewComponent } from './data-view/data-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmpRegisterComponent } from './emp-register/emp-register.component';
import { ViewRegisteredEmpComponent } from './view-registered-emp/view-registered-emp.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'add-entry', component: DataEntryComponent },
  { path: 'view-entry', component: DataViewComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'emp-register', component: EmpRegisterComponent },
  { path: 'view-registered-employees', component: ViewRegisteredEmpComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





