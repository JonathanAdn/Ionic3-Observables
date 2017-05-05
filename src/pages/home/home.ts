import { UserForm } from '../user-form/user-form';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../providers/user.service';
import { User } from '../../models/user';
import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  users: User[];
  searchQuery: string = '';
  selectedUsers: any[] = [];
  selectedUser: User;

  constructor(  private navCtrl: NavController, 
                private userService: UserService, 
                private loading: LoadingController, 
                private navParams: NavParams ) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    // on user deleted
    userService.userDeleted$
      .subscribe(user => this.users.splice(this.users.indexOf(user), 1));

    // on user added  
    userService.userAdded$
      .subscribe(user => this.users.push(user));
  }

  loadUsersObs() {
    let loader = this.userService.createLoader();
    loader.present()
      .then(() => {
        this.userService.getUsers()
          .subscribe(users => {
            this.users = users;
            loader.dismiss();
          })
      })
      .catch(err => console.log('err in load users loader: ', err))
  }

  gotoUserForm(user: User): void {
    this.navCtrl.push(UserForm, { userForm: user });
  }

  deleteUser(user?: User): void {
    let loader = this.userService.createLoader(`Deleting ${user.name}...`);
    loader.present()
      .then(() => {
        this.userService.removeUser(user)
          .subscribe(() => loader.dismiss())
      })
      .catch(err => console.log('err in delete user loader: ', err))
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    if(!this.users) this.loadUsersObs();
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
