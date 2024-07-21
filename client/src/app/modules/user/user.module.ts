import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    ProfileComponent,
    MyProjectComponent,
    EmployeeComponent,
    HomeComponent,
    ProjectComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
