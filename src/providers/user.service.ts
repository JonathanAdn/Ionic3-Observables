import { LoadingController } from 'ionic-angular';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private sheetsuApiUrl: string = 'https://sheetsu.com/apis/v1.0/f85c5184554b'; 

  constructor(private http: Http, private loading: LoadingController) { }

  createLoader(params?: any): any {
    let loader: any = this.loading.create({
      spinner: 'crescent',
      content: params ? params : 'Please wait...',
      showBackdrop: false
    });
    return loader;
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get(this.sheetsuApiUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  getUser(id: number | string): Observable<User> {
    return this.http
      .get(`${this.sheetsuApiUrl}/search?id=${id}`)
      .map((res: Response) => res.json()[0])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  updateUser(body: Object): Observable<User> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option

      return this.http
        .put(`${this.sheetsuApiUrl}/id/${body['id']}`, body, options) // ...using put request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  } 

  addUser(body: Object): Observable<User> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option

    // generate random id for testing
    body['id'] = Math.floor(Math.random()*(10000-1+1)+1);

      return this.http
        .post(this.sheetsuApiUrl, body, options) // ...using post request
        .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  } 

  removeUser(body: Object): Observable<User> {
    return this.http
      .delete(`${this.sheetsuApiUrl}/id/${body['id']}`) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if an
  }
}
