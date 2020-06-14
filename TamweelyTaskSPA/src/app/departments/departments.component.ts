import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { DepartmentsService } from './../Services/departments.service';
import { DepartmentsModule } from './departments.module';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepartmentModel } from 'src/app/Interfaces/department-model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject();
  Departments: DepartmentModel[];
  isDtInitialized: boolean = false;



  constructor(public dialog: MatDialog, private DepSrv: DepartmentsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dtOptions = {
      paging: false,
      searching: false
    };

    this.DepSrv.GetAll().subscribe(
      res => {
        console.log(res)
        this.Departments = res;
        this.rerender();
      }

    )

  }


  Add(): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(CreateDepartmentComponent, {
      width: '700px',
      height: 'auto',

      disableClose: true
    }).afterClosed().subscribe(res => {
      console.log(res)
      this.ngOnInit();
    }
    )
  }

  Edit(department: DepartmentModel): void {
    event.stopPropagation();
    console.log(department);
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      width: '700px',
      height: 'auto',
      data: { departmentForEdit: department },
      disableClose: true
    }).afterClosed().subscribe(res => {
      console.log(res)
      this.ngOnInit();
    }
    )
  }

  Delete(Id: number) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.DepSrv.Delete(Id).subscribe(
          res => {
            console.log(res)
            this.ngOnInit();
            this.snackBar.open(res.message, " ", {
              duration: 3000
            })
          },
          err => {
            console.log(err)
            this.snackBar.open(err.message, " ", {
              duration: 3000
            })
          }
        )
      }
      dialogRef = null;
    });
  }
  rerender(): void {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
