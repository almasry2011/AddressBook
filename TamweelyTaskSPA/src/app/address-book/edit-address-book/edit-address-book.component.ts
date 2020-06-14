import { TitlesService } from './../../Services/titles.service';
import { DepartmentsService } from './../../Services/departments.service';
import { TitlesModel } from './../../Interfaces/titles-model';
import { Component, OnInit, Inject } from '@angular/core';
import { AddressBookModel } from 'src/app/Interfaces/address-book-model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressBookService } from 'src/app/Services/address-book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentModel } from 'src/app/Interfaces/department-model';

@Component({
  selector: 'app-edit-address-book',
  templateUrl: './edit-address-book.component.html',
  styleUrls: ['./edit-address-book.component.css']
})
export class EditAddressBookComponent implements OnInit {
  AddressBooksForEdit: AddressBookModel;
  Departments: DepartmentModel[];
  Titles: TitlesModel[];


  AddressBooksForm: FormGroup;
  id: FormControl;
  fullName: FormControl;
  phoneNumber: FormControl;
  dob: FormControl;
  address: FormControl;
  email: FormControl;
  photo: FormControl;
  departmentId: FormControl;
  titleId: FormControl;


  constructor(public dialogRef: MatDialogRef<EditAddressBookComponent>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, private DepSrv: DepartmentsService, private TitleSrv: TitlesService,
    private AddBookSrv: AddressBookService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.AddressBooksForEdit = this.data.AddressBooksForEdit;
    this.DepSrv.GetAll().subscribe(
      res => {
        this.Departments = res;
      }
    );

    this.TitleSrv.GetAll().subscribe(
      res => {
        this.Titles = res;
        alert(JSON.stringify(this.Titles))
      }
    );
    this.InitForm();
  }

  Cancel(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    console.log('value');
    var model = this.AddressBooksForm.value;
    console.log(this.AddressBooksForm.value);
    this.AddBookSrv.Update(model).subscribe(
      res => {
        console.log(res);
        this.snackBar.open("Updated Successfully", "Hide", { duration: 300 })
        this.Cancel();
      },
      err => {
        console.log(err);
        this.snackBar.open("Error", "Hide", { duration: 300 })
      }
    )
  }



  InitForm() {


    this.fullName = new FormControl(this.AddressBooksForEdit.fullName, [
      Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])]);

    this.phoneNumber = new FormControl(this.AddressBooksForEdit.phoneNumber, [
      Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])]);



    this.dob = new FormControl(new Date(this.AddressBooksForEdit.dob), Validators.compose([Validators.required]));

    this.address = new FormControl(this.AddressBooksForEdit.address, [Validators.compose([Validators.required])]);

    this.email = new FormControl(this.AddressBooksForEdit.email, Validators.compose([Validators.required, Validators.email]));



    this.photo = new FormControl(this.AddressBooksForEdit.photo);

    this.id = new FormControl(this.AddressBooksForEdit.id);////
    this.departmentId = new FormControl(this.AddressBooksForEdit.departmentId, [Validators.compose([Validators.required, Validators.min(1)])]);
    this.titleId = new FormControl(this.AddressBooksForEdit.titleId, [Validators.compose([Validators.required, Validators.min(1)])]);




    this.AddressBooksForm = this.fb.group({
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      dob: this.dob,
      address: this.address,
      email: this.email,
      photo: this.photo,
      departmentId: this.departmentId,


      titleId: this.titleId,

      id: this.id,
    });
  }


}
