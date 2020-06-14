import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTitleComponent } from '../create-title/create-title.component';
import { TitlesService } from 'src/app/Services/titles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitlesModel } from 'src/app/Interfaces/titles-model';

@Component({
  selector: 'app-edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.css']
})
export class EditTitleComponent implements OnInit {
  Id: number;
  Name: string;
  TitleForEdit: TitlesModel
  constructor(public dialogRef: MatDialogRef<EditTitleComponent>, private TitleSrv: TitlesService,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.TitleForEdit = this.data.titleForEdit;
    this.Id = this.TitleForEdit.id;
    this.Name = this.TitleForEdit.titleName;

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
    this.TitleSrv.Update(model).subscribe(
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
