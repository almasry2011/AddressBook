import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressBookRoutingModule } from './address-book-routing.module';
import { AddressBookComponent } from './address-book.component';
import { CreateAddressBookComponent } from './create-address-book/create-address-book.component';
import { EditAddressBookComponent } from './edit-address-book/edit-address-book.component';
import { DataTablesModule } from 'angular-datatables';
import { AngularMaterialModule } from 'src/app/AngularMaterial/Angular_Material_Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    AddressBookComponent,
    CreateAddressBookComponent,
    EditAddressBookComponent

  ],
  imports: [
    CommonModule,
    AddressBookRoutingModule,


    DataTablesModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,



  ]
})
export class AddressBookModule { }
