import { TitlesComponent } from './titles.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitlesRoutingModule } from './titles-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { AngularMaterialModule } from 'src/app/AngularMaterial/Angular_Material_Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTitleComponent } from './edit-title/edit-title.component';
import { CreateTitleComponent } from './create-title/create-title.component';


@NgModule({
  declarations: [
    TitlesComponent,
    EditTitleComponent,
    CreateTitleComponent
  ],
  imports: [
    CommonModule,
    TitlesRoutingModule,
    DataTablesModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TitlesModule { }
