import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/Services/departments.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentModel } from 'src/app/Interfaces/department-model';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {


  Id: number;
  Name: string;
  constructor(public dialogRef: MatDialogRef<CreateDepartmentComponent>, private DepSrv: DepartmentsService
    , private snackBar: MatSnackBar) { }

  ngOnInit(): void {


  }


  Cancel(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    console.log('value');
    var model: DepartmentModel = {
      id: this.Id,
      departmentName: this.Name
    }
    console.log(model);
    this.DepSrv.Create(model).subscribe(
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


}
