﻿﻿import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import {BaseDialogService} from './base-dialog.service';

@Component({
  selector: 'lms-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BaseDialogComponent implements OnInit, OnDestroy{

  @Input() title: string;
  @Input() id: string;
  private element: any;
  btns: Array<object>;
  headerBtns: Array<object>;

  constructor(private dialogService: BaseDialogService, private el: ElementRef) {
    this.element = el.nativeElement;
    this.headerBtns = [{title:'close', action: 'close'}];
    this.btns = [{
      title: 'Close',
      'class': '',
      action: 'close'
    }, {
      title: 'Ok',
      'class': '',
      action: 'close'
    }]
  }

  ngOnInit(): void {
    if (!this.id) {
      throw new Error('modal must have an id');
    }

    this.renderElement();

    document.body.appendChild(this.element);
    this.bindListeners();

    this.dialogService.add(this);
  }

  renderElement() {
    /**/
  }

  bindListeners():void {
    //this.element.removeEventListener('click', this.handleCloseClick);
    //this.element.addEventListener('click', this.handleCloseClick.bind(this));
  }

  actionPerformed(action) : void{
    if(action && this.hasOwnProperty(action) && typeof this[action] === 'function') {
      this[action]();
    }
  }

  handleCloseClick(evt): void {
    if (evt.target.className === 'lms-dialog') {
      this.close();
    }
  }

  open(): void {
    debugger;
    this.element.classList.add('active');
  }

  close(): void {
    debugger;
    this.element.classList.remove('active');
  }

  ngOnDestroy(): void {
    debugger
    //this.dialogService.remove(this.id);
    //this.element.remove();
  }
}
