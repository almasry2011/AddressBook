import { UserModel } from './Interfaces/user-model';
import { AccountService } from 'src/app/Services/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'TamweelyTask';
  isLoggedIn: Boolean;
  UserName: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private AccSrv: AccountService) { }

  ngOnInit(): void {
    this.isLoggedIn = false;

    this.AccSrv.isLoggesIn.subscribe(res => {
      if (!res) {
        this.isLoggedIn = false;

        this.router.navigate(['/login'])
      } else {
        this.isLoggedIn = true;
        this.AccSrv.currentUserName.subscribe(
          res => { this.UserName = res }
        )
        this.router.navigate(['/addressbook'])
      }

    })


  }



}


