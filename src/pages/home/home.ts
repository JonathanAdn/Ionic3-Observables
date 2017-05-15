import { UserForm } from '../user-form/user-form';
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
  actionMsg: string = '';

  constructor(  private navCtrl: NavController, 
                private userService: UserService, 
                private loading: LoadingController, 
                private navParams: NavParams ) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    // on user deleted
    userService.userDeleted$.subscribe(user => {
      let index = this.users.indexOf(user);
      if(~index) this.users.splice(index, 1);
      this.presentToaster(user.name, 'removed');
    });

    // on user edited
    userService.userEdited$.subscribe(user => {
      for(let i = 0; i < this.users.length; i++) {
        if(user.id === (this.users[i].id).toString()) {
          this.users[i] = user;
        }
      }
      this.presentToaster(user.name, 'updated');
    });

    // on user added  
    userService.userAdded$.subscribe(user => {
      this.users.push(user);
      this.presentToaster(user.name, 'inserted');
    });
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

  gotoUserForm(user?: User): void {
    user !== undefined ? this.navCtrl.push(UserForm, { id: user.id }) : this.navCtrl.push(UserForm);
  }

  deleteUser(user?: User): void {
    let loader = this.userService.createLoader(`Deleting ${user.name}...`);
    loader.present()
      .then(() => {
        this.userService.removeUser(user)
          .subscribe(() => loader.dismiss()
          , err => console.log(err))
      })
      .catch(err => console.log('err in delete user loader: ', err))
  }

  presentToaster(user, action): void {
    this.actionMsg = `${user} has been successfuly ${action}`;
    let toast = this.userService.createToaster(this.actionMsg);
    toast.present();
  }

  ionViewWillEnter() {
    // this.tabBarElement.style.display = 'none';
    if(!this.users) this.loadUsersObs();
  }
 
  ionViewWillLeave() {
    // this.tabBarElement.style.display = 'flex';
  }

}
