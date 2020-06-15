import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[openDialog]'
})
export class BaseDialogDirective {
  constructor(private el: ElementRef) {}

  @Input() defaultColor: string;

}
