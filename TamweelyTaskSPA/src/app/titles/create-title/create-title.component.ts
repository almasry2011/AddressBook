import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitlesService } from 'src/app/Services/titles.service';
import { TitlesModel } from 'src/app/Interfaces/titles-model';

@Component({
  selector: 'app-create-title',
  templateUrl: './create-title.component.html',
  styleUrls: ['./create-title.component.css']
})
export class CreateTitleComponent implements OnInit {

  Id: number;
  Name: string;
  constructor(public dialogRef: MatDialogRef<CreateTitleComponent>, private TitleSrv: TitlesService
    , private snackBar: MatSnackBar) { }

  ngOnInit(): void {


  }


  Cancel(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    var model: TitlesModel = {
      id: this.Id,
      titleName: this.Name
    }
    console.log(model);
    this.TitleSrv.Create(model).subscribe(
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
