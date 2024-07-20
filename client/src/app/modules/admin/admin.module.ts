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
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifyComponent } from '../../components/notify/notify.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AgGridAngular} from 'ag-grid-angular'
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from "@angular/material-moment-adapter";

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
    ProjectForm
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
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
})
export class AdminModule {}
