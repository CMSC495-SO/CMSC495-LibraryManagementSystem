import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  private readonly URL = 'http://localhost:3000/sample'
  constructor(private http: HttpClient) { }

  /* this method will return the list of items in our sample service
   from our router we created earlier */
  resolveItems() : Observable<any>{
    console.log('a request has been sent');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    return this.http.get(this.URL);
  }
}
