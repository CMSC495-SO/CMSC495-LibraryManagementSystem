import { Component, OnInit } from '@angular/core';
import {BaseGadgetComponent} from '../../../../component/base-gadget/base-gadget.component';

import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-global-catalog',
  templateUrl: './global-catalog.component.html',
  styleUrls: ['./global-catalog.component.css']
})
export class GlobalCatalogComponent extends BaseGadgetComponent implements OnInit {
  catalogData: any[];
  displayedColumns: any[] = ['position', 'name', 'weight', 'symbol'];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}

export interface BookData {
  id: string;
  title: string;
  dateAdded: string;

}
