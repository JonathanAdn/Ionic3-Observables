import { LoadingController, ToastController } from 'ionic-angular';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private sheetsuApiUrl: string = 'https://sheetsu.com/apis/v1.0/f85c5184554b'; 

  // Observable object sources
  private _deleteUser = new Subject<any>();
  private _addUser = new Subject<any>();
  private _editUser = new Subject<any>();

  // Observable object streams
  userDeleted$ = this._deleteUser.asObservable();
  userAdded$ = this._addUser.asObservable();
  userEdited$ = this._editUser.asObservable();

  constructor(private http: Http, private loading: LoadingController, private toaster: ToastController) { }

  createLoader(params?: any): any {
    let loader: any = this.loading.create({
      spinner: 'crescent',
      content: params ? params : 'Please wait...'
    });
    return loader;
  }

  createToaster(params?: any): any {
    let toaster: any = this.toaster.create({
      message: params,
      duration: 3000
    });
    return toaster;
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
        .map((res: Response) => {
          let user = res.json()[0];
          this._editUser.next(user);
        }) // ...and calling .json() on the response to return data
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
        .map((res: Response) => {
          let user = res.json();
          this._addUser.next(user);
        }) // ...and calling .json() on the response to return data
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  } 

  removeUser(body: Object): Observable<User> {
    return this.http
      .delete(`${this.sheetsuApiUrl}/id/${body['id']}`) // ...using put request
      .map((res: Response) => {
        this._deleteUser.next(body);
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if an
  }
}
