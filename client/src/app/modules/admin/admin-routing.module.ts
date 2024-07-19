// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DesignationComponent } from './components/designation/designation.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path:'dashboard',
        component:HomeComponent
      },
      {
        path:'designation',
        component:DesignationComponent
      },{
        path:'employee',
        component:EmployeeComponent
      },{
        path:'project',
        component:ProjectComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}