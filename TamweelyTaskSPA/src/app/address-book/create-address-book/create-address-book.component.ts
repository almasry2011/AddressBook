import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditAddressBookComponent } from '../edit-address-book/edit-address-book.component';
import { AddressBookService } from 'src/app/Services/address-book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentModel } from 'src/app/Interfaces/department-model';
import { TitlesModel } from 'src/app/Interfaces/titles-model';
import { DepartmentsService } from 'src/app/Services/departments.service';
import { TitlesService } from 'src/app/Services/titles.service';

@Component({
  selector: 'app-create-address-book',
  templateUrl: './create-address-book.component.html',
  styleUrls: ['./create-address-book.component.css']
})
export class CreateAddressBookComponent implements OnInit {
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
    this.DepSrv.GetAll().subscribe(
      res => {
        this.Departments = res;
      }
    );

    this.TitleSrv.GetAll().subscribe(
      res => {
        this.Titles = res;
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
    this.AddBookSrv.Create(model).subscribe(
      res => {
        console.log(res);
        this.snackBar.open("Successfully Created", "Hide", { duration: 300 })
        this.Cancel();
      },
      err => {
        console.log(err);
        this.snackBar.open("Error", "Hide", { duration: 300 })

      }

    )

  }



  InitForm() {


    this.fullName = new FormControl('', [
      Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])]);


    this.phoneNumber = new FormControl('', [
      Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])]);



    this.dob = new FormControl('', Validators.compose([Validators.required]));

    this.address = new FormControl('', [Validators.compose([Validators.required])]);

    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));



    this.photo = new FormControl('');

    this.id = new FormControl(0);////
    this.departmentId = new FormControl(0, [Validators.compose([Validators.required, Validators.min(1)])]);
    this.titleId = new FormControl(0, [Validators.compose([Validators.required, Validators.min(1)])]);




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
