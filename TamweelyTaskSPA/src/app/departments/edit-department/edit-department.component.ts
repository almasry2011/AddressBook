import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentsService } from 'src/app/Services/departments.service';
import { DepartmentModel } from 'src/app/Interfaces/department-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {

  DepartmentForEdit: DepartmentModel;



  Id: number;
  Name: string;
  constructor(public dialogRef: MatDialogRef<EditDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private DepSrv: DepartmentsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.DepartmentForEdit = this.data.departmentForEdit;
    this.Id = this.DepartmentForEdit.id;
    this.Name = this.DepartmentForEdit.departmentName;

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
    this.DepSrv.Update(model).subscribe(
      res => {
        console.log(res);
        this.snackBar.open("Successfully Updated", "Hide", { duration: 300 })
        this.Cancel();
      },
      err => {
        console.log(err);
        this.snackBar.open("Error", "Hide", { duration: 300 })

      }

    )

  }




}
