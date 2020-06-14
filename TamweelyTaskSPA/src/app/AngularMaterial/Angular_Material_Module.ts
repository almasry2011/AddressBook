import { NgModule } from '@angular/core';



import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
    imports: [MatDialogModule, MatNativeDateModule, MatDatepickerModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSnackBarModule],
    exports: [MatDialogModule, MatDatepickerModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSnackBarModule]

})
export class AngularMaterialModule { }
