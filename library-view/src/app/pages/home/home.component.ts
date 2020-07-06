import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StorageManager} from '../../tools/storageManager';

import {ConfirmationDialogComponent} from '../../component/confirmation-dialog/confirmation-dialog.component';
import {BaseGadgetDirective} from '../../component/base-gadget/base-gadget.directive';
import {BaseGadgetComponent} from "../../component/base-gadget/base-gadget.component";
import {GlobalCatalogComponent} from "./gadgets/global-catalog/global-catalog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() component;

  @ViewChild(BaseGadgetDirective, {static: true}) gadgetHost: BaseGadgetDirective;

  loggedIn: boolean = false;
  userData: any = null;
  user: any = {isAdmin: false, isLibrarian: false};

  constructor(private dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    let storage = new StorageManager({});
    this.userData = JSON.parse(storage.getStorageItem('userdata'));
    if (this.userData) {
      this.loggedIn = true;
      if (this.userData.hasOwnProperty('roles')) {
        this.user.isAdmin = this.userData.roles.indexOf('admin') !== -1;
        this.user.isLibrarian = this.userData.roles.indexOf('librarian') !== -1;
      }
    }

    this.loadComponent();
  }

  openLibraryComponent(componentName) {
    console.log('trying to open ', componentName);
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GlobalCatalogComponent);
    const vcr = this.gadgetHost.vcr;

    vcr.clear();

    this.component = vcr.createComponent(componentFactory);
  }

  showFeatureUnavailable() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Feature currently unavailable',
        inquiry: 'Feature is currently in development, please try again later'
      },
      closeOnNavigation: false
    });
  }
}
