import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { DataTablesModule } from 'angular-datatables';
import { AngularMaterialModule } from 'src/app/AngularMaterial/Angular_Material_Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepartmentsComponent,
    CreateDepartmentComponent,
    EditDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    DataTablesModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DepartmentsModule { }
