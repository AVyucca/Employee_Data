import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { DataViewComponent } from './data-view/data-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; // ✅ Add this import

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'add-entry', component: DataEntryComponent },
  { path: 'view-data', component: DataViewComponent },
  { path: 'user-profile', component: UserProfileComponent } // ✅ Add this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

