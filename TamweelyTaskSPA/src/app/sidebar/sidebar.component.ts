import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userName: string;
  userImage: string;

  constructor() { }

  ngOnInit(): void {

    this.userImage = localStorage.getItem("userPicture")
    this.userName = localStorage.getItem("username")

  }

}
