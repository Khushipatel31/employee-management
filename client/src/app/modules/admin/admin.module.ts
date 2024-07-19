import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationComponent } from './components/designation/designation.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [DesignationComponent,HomeComponent,ProjectComponent,EmployeeComponent,DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
