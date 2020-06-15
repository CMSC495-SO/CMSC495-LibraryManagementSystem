import { Component } from '@angular/core';
import {BaseDialogService} from "./component/base-dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library-view';

  constructor(private dialogService:BaseDialogService) {}

  submitDataFromForm() {
    debugger
  }

  closeDialog(id) {
    debugger;
    this.dialogService.close(id);
  }
}
