import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit {
  title = 'Library Management System';
  constructor() { }

  ngOnInit(): void {
  }

}
