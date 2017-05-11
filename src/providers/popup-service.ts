import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

/*
  Generated class for the PopupService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PopupService {

  private _confirmed = new Subject<any>();
  _confirmed$ = this._confirmed.asObservable();

  constructor() {  }

  confirm(): void {
    this._confirmed.next('confirmed');
  }
}
