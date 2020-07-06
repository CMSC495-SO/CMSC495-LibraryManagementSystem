import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[gadget-position]'
})
export class BaseGadgetDirective {
  constructor(public vcr: ViewContainerRef) {}
}
