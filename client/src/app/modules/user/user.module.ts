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
import { AgGridAngular } from 'ag-grid-angular';
import { JoinProjectComponent } from './components/dialogs/join-project/join-project.component';
import { ProjectActionComponent } from './components/actionButtons/project-action/project-action.component';
import { EmployeeActionComponent } from './components/actionButtons/employee-action/employee-action.component';
import { EmployeeProjectsComponent } from './components/employee-projects/employee-projects.component';
import { Step1Component } from './components/profile/registration/step1/step1.component';
import { Step2Component } from './components/profile/registration/step2/step2.component';
import { Step3Component } from './components/profile/registration/step3/step3.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { LeaveActionComponent } from './components/actionButtons/leave-action/leave-action.component';
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
    ProjectActionComponent,
    JoinProjectComponent,
    EmployeeActionComponent,
    EmployeeProjectsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    LeaveActionComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AgGridAngular,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class UserModule {}
