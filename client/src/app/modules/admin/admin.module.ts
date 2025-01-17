import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationComponent } from './components/designation/designation.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DesignationComponent as DesignationForm } from './components/formsDialog/designation/designation.component';
import { ProjectComponent as ProjectForm } from './components/formsDialog/project/project.component';
import { EmployeeComponent as EmployeeForm } from './components/formsDialog/employee/employee.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifyComponent } from '../../components/notify/notify.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgGridAngular } from 'ag-grid-angular';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { ProjectActionComponent } from './components/actionButtons/project-action/project-action.component';
import { EmployeeActionComponent } from './components/actionButtons/employee-action/employee-action.component';
import { DesignationActionComponent } from './components/actionButtons/designation-action/designation-action.component';
import { MatSelectModule } from '@angular/material/select';
import { ProjectDeleteComponent } from './components/deleteDialog/project-delete/project-delete.component';
import { EmployeeDeleteComponent } from './components/deleteDialog/employee-delete/employee-delete.component';
import { AdminLogoutComponent } from '../../components/dialogs/admin-logout/admin-logout.component';
import { ProjectEmployeesComponent } from './components/project-employees/project-employees.component';
import { ViewEmployeeDialogComponent } from './components/view-employee-dialog/view-employee-dialog.component';
import { ViewEmployeeComponent } from './components/actionButtons/view-employee/view-employee.component';
import { MatRadioModule } from '@angular/material/radio';
import { ApproveLeaveComponent } from './components/approve-leave/approve-leave.component';
import { LeaveDialogComponent } from './components/approve-leave/leave-dialog/leave-dialog.component';
import { FormsModule } from '@angular/forms';
import { ProjectRequestsComponent } from './components/project-requests/project-requests.component';
import { JoinProjectRequestComponent } from './components/formsDialog/join-project-request/join-project-request.component';
import { ProjectJoinActionComponent } from './components/actionButtons/project-join-action/project-join-action.component';
@NgModule({
  declarations: [
    DesignationComponent,
    HomeComponent,
    ProjectComponent,
    EmployeeComponent,
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    DesignationComponent,
    DesignationForm,
    NotifyComponent,
    ProjectForm,
    ProjectActionComponent,
    EmployeeForm,
    EmployeeActionComponent,
    ProjectDeleteComponent,
    EmployeeDeleteComponent,
    DesignationActionComponent,
    AdminLogoutComponent,
    ProjectEmployeesComponent,
    ViewEmployeeDialogComponent,
    ViewEmployeeComponent,
    ApproveLeaveComponent,
    LeaveDialogComponent,
    ProjectRequestsComponent,
    JoinProjectRequestComponent,
    ProjectJoinActionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AgGridAngular,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class AdminModule {}
