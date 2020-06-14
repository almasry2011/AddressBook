import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  Email: FormControl;
  username: FormControl;
  password: FormControl;
  Cpassword: FormControl;



  constructor(private fb: FormBuilder, private acc: AccountService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.RegisterForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      Cpassword: ['', [Validators.required]],

    })
  }

  register() {
    console.log(this.RegisterForm.value)
    this.acc.Register(this.RegisterForm.value).subscribe((data: any) => {
      console.log(data)
      this.router.navigate(['login'])
      this.snackBar.open(' Successfully Registerd Please log in', 'cancel', {
        duration: 5000,
      });
    },
      error => {
        console.log(error.errors)

        for (let index = 0; index < error.error.length; index++) {

          this.snackBar.open(' Error ' + error.error[index].description + '  ', 'cancel', {
            duration: 5000,
          });
        }
      }
    );

  }


}
