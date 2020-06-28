import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  allLoginUrl = {
    basePath: 'http://localhost:3000/lib/library',
    findUser: '/users/checkUser',
    loginUrl: '/login'
  };

  user:object = null;

  /*possible options for get*/

  /*options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }*/
  constructor(private http: HttpClient) {
  }

  checkUserNameValid(userNameParams) {
    return this.http.get(this.allLoginUrl.basePath + this.allLoginUrl.findUser, {params: userNameParams})
  }

  loginUser(data) {
    return this.http.post(this.allLoginUrl.basePath + this.allLoginUrl.loginUrl, {params: data});
  }

  setUserData(data) {
    if (!this.user) {
      this.user = data;
    }
  }

  getUserData() {
    return this.user;
  }

  /*todo: Future use*/
  handleError(response) {
    if (response.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
        `body was: ${response.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
