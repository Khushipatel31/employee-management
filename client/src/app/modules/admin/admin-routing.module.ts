import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DesignationComponent } from './components/designation/designation.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectEmployeesComponent } from './components/project-employees/project-employees.component';
import { ProjectRequestsComponent } from './components/project-requests/project-requests.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: HomeComponent,
      },
      {
        path: 'designation',
        component: DesignationComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'project',
        component: ProjectComponent,
      },
      {
        path: 'project/:id',
        component: ProjectEmployeesComponent,
      },
      {
        path: 'projectRequest',
        component: ProjectRequestsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
