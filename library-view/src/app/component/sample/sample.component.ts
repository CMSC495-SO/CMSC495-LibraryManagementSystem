import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SampleService } from '../../service/sample.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  code = true;
  title = 'library-view';
  @Input()
  results: [];
  constructor(private sampleService: SampleService) {
    var context = this;

    sampleService.resolveItems().subscribe(function(response) {
      context.results = response;
    });
   }

  ngOnInit(): void {
  }
}
