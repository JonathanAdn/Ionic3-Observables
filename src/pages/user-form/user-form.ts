import { User } from '../../models/user';
import { UserService } from '../../providers/user.service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserForm {

  isLoading: boolean = false;
  user: User = <User>{ id: null, name: '', score: null };
  tabBarElement: any;

  constructor(  private navCtrl: NavController, 
                private navParams: NavParams, 
                private userService: UserService, 
                private loading: LoadingController  ) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.user = this.navParams.get('userForm') || this.user ;
  }

  submit(user: User): void {
    let loader = this.userService.createLoader();
    this.isLoading = true;
    loader.present().then(() => {
      if(user.id) {
        this.userService.updateUser(user)
          .subscribe(() => {
            this.navCtrl.pop();
            loader.dismiss(); 
          })
      } else {
        this.userService.addUser(user)
          .subscribe(() => {
            this.navCtrl.pop(); 
            loader.dismiss();
          })
      }
      
    })
    .catch(err => {
      this.isLoading = false;
    })
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
