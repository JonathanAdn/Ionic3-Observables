import { UserForm } from '../user-form/user-form';
import { Observable, Subject } from 'rxjs/Rx';
import { UserService } from '../../providers/user.service';
import { User } from '../../models/user';
import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  users: Observable<User[]>;
  searchQuery: string = '';
  deleteSubject: any;
  addSubject: any;
  mergedObs: any;

  constructor(  private navCtrl: NavController, 
                private userService: UserService, 
                private loading: LoadingController, 
                private navParams: NavParams,
                private cdRef: ChangeDetectorRef  ) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.deleteSubject = new Subject();
    this.addSubject = new Subject();
  }

  loadUsersObs() {
    let loader = this.userService.createLoader();
    loader.present()
      .then(() => {
        this.users = this.userService.getUsers();
        this.mergedObs = this.users.merge(this.deleteSubject, this.addSubject)
          .startWith([])
          .scan((acc, val) => {
            if(val instanceof Array) {
              return val;
            } else if(val['op'] === 'delete') {
              let index = acc.findIndex(elt => elt.id === val['id']);
              acc.splice(index, 1);
              return acc;
            } else if(val['op'] === 'add') {
              let user = val['obj'];
              acc.push(user);
              return acc;
            } 
          })
          loader.dismiss();
      })
      .catch(err => console.log('err in load users loader: ', err))
  }

  gotoUserForm(user: User): void {
    // this.navCtrl.push(UserForm, { userForm: user });

    let user_ = { name: 'Joe', score: 156 };
    this.userService.addUser(user_)
      .subscribe(() => {
        this.addSubject.next({ 
          op: 'add', 
          obj: user_ 
        });
      })
  }

  deleteUser(user: User): void {
    let loader = this.userService.createLoader(`Deleting ${user.name}...`);
    loader.present()
      .then(() => {
        this.userService.removeUser(user)
          .subscribe(() => {
            this.deleteSubject.next({ op: 'delete', id: user.id });
            loader.dismiss();
          })
      })
      .catch(err => console.log('err in delete user loader: ', err))
    
  }

  ionViewWillEnter() {
    this.cdRef.detectChanges();
    this.tabBarElement.style.display = 'none';
    if(!this.users) this.loadUsersObs();
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
