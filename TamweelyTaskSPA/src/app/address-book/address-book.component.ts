import { SearchModel } from './../Interfaces/search-model';
import { CreateAddressBookComponent } from './create-address-book/create-address-book.component';
import { EditAddressBookComponent } from './edit-address-book/edit-address-book.component';
import { AddressBookService } from './../Services/address-book.service';
import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { DepartmentsComponent } from '../departments/departments.component';
import { AddressBookModel } from 'src/app/Interfaces/address-book-model';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject();
  AddressBooks: AddressBookModel[];
  isDtInitialized: boolean = false;

  StartDate: any// Date;
  EndDate: any// Date;

  constructor(public dialog: MatDialog, private AddBookSrv: AddressBookService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {



    this.dtOptions = {
      // pagingType: 'full_numbers',
      // pageLength: 2,
      // paging: false,
      //destroy: true,
      // searching: false
      //  pagingType: 'full_numbers',
      //  pageLength: 10,
      dom: 'Bfrtip',
      buttons: [
        'colvis',
        'pdf',
        'print',
        'excel'

      ]








    };

    this.AddBookSrv.GetAll().subscribe(
      res => {
        // alert(JSON.stringify(res))
        console.log(res)
        this.AddressBooks = res;
        // this.dtTrigger.next();
        this.rerender();
      }

    )

  }


  Search() {
    // alert(`Start Date = ${this.StartDate} End Date = ${this.EndDate}`)
    var SearchModel: SearchModel = {
      SearchValue: '',
      StartDate: this.StartDate,
      EndDate: this.EndDate
    }
    this.AddBookSrv.Search(SearchModel).subscribe(
      res => {
        console.log(res)
        this.AddressBooks = res;
        this.rerender();
      },
      err => {
        this.snackBar.open('No Results Found', 'Cancel', {
          duration: 10000,
        });
      }
    )
  }
  ///////////////
  Add(): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(CreateAddressBookComponent, {
      width: '700px',
      height: 'auto',

      disableClose: true
    }).afterClosed().subscribe(res => {
      console.log(res)
      this.ngOnInit();
    }


    )
  }

  Edit(AddressBook: AddressBookModel): void {
    event.stopPropagation();
    console.log(AddressBook);
    const dialogRef = this.dialog.open(EditAddressBookComponent, {
      width: '700px',
      height: 'auto',
      data: { AddressBooksForEdit: AddressBook },
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

        this.AddBookSrv.Delete(Id).subscribe(
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
    // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   // Destroy the table first
    //   dtInstance.destroy();
    //   // Call the dtTrigger to rerender again
    //   // this.dtTrigger.next();
    // });





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
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }





  ////////////
}
