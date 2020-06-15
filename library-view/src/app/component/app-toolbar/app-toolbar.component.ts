import { Component, OnInit } from '@angular/core';
import {BaseDialogService} from "../base-dialog";

@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit {
  title = 'Library Management System';

  constructor(private dialogService: BaseDialogService) {}

  ngOnInit(): void {
  }

  openDialog(id: string) {
    this.dialogService.open(id);
  }

  closeDialog(id: string) {
    this.dialogService.close(id);
  }
}
