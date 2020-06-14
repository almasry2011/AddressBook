import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  constructor(private fb: FormBuilder, private acc: AccountService, private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]

    })
  }


  login() {
    this.acc.login(this.loginForm.value).subscribe(
      data => {
        console.log(data);
        this.snackBar.open('Successfully logged in', 'cancel', {
          duration: 3000,
        });
        this.router.navigate(['/addressbook'])
      },
      error => {
        this.snackBar.open(error.error, 'cancel', {
          duration: 3000,
        });
        console.log(error.error);
      }
    );

  }



}
