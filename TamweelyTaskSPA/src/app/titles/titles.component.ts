import { EditTitleComponent } from './edit-title/edit-title.component';
import { CreateTitleComponent } from './create-title/create-title.component';
import { TitlesService } from './../Services/titles.service';
import { TitlesModel } from './../Interfaces/titles-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateDepartmentComponent } from '../departments/create-department/create-department.component';
import { TitlesModule } from './titles.module';
import { EditDepartmentComponent } from '../departments/edit-department/edit-department.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})
export class TitlesComponent implements OnInit {


  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject();
  Titles: TitlesModel[];
  isDtInitialized: boolean = false;



  constructor(public dialog: MatDialog, private TitlesSrv: TitlesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {



    this.dtOptions = {
      paging: false,
      searching: false
    };

    this.TitlesSrv.GetAll().subscribe(
      res => {
        console.log(res)
        this.Titles = res;
        this.rerender();
      }

    )

  }


  Add(): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(CreateTitleComponent, {
      width: '500px',
      height: 'auto',

      disableClose: true
    }).afterClosed().subscribe(res => {
      console.log(res)
      this.ngOnInit();
    }
    )
  }

  Edit(title: TitlesModule): void {
    event.stopPropagation();
    console.log(title);
    const dialogRef = this.dialog.open(EditTitleComponent, {
      width: '500px',
      height: 'auto',
      data: { titleForEdit: title },
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

        this.TitlesSrv.Delete(Id).subscribe(
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

