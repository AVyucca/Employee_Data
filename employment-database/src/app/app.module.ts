import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';    // ✅ You forgot this!

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { DataViewComponent } from './data-view/data-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmpRegisterComponent } from './emp-register/emp-register.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewRegisteredEmpComponent } from './view-registered-emp/view-registered-emp.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'add-entry', component: DataEntryComponent },
  { path: 'view-entry', component: DataViewComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'emp-register', component: EmpRegisterComponent },
  { path:'view-registered-emp',component:ViewRegisteredEmpComponent}  // ✅ Added this route!
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    DataEntryComponent,
    DataViewComponent,
    UserProfileComponent,
    EmpRegisterComponent,
    ViewRegisteredEmpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),   // ✅ Register routes here
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
