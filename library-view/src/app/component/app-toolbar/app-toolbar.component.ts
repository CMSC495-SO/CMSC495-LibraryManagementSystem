import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {LoginComponent} from "../login/login.component";
import {StorageManager} from "../../tools/storageManager";

@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit{
  title = 'Library Management System';
  userInfo: object;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    let storageContainer = new StorageManager({});
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {title: 'Sign In'},
      closeOnNavigation: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userInfo = JSON.parse(storageContainer.getStorageItem('userdata'));
    });
  }

  ngOnInit() {
    let storageContainer = new StorageManager({});
    this.userInfo = JSON.parse(storageContainer.getStorageItem('userdata'));
  }
}
