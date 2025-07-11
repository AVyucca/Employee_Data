import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeHubPageComponent } from './employee-hub-page/employee-hub-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  // ✅ default route
  { path: 'hub', component: EmployeeHubPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
