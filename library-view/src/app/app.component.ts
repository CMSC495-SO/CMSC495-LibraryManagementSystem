import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'library-view';
  isUserSignedIn = false;
  signedInUser: Object;

  constructor() {}

  ngOnInit() {
    /*bootstrapping*/

  }

  submitDataFromForm() {
    debugger
  }

  closeDialog(id) {
    debugger;
  }
}
