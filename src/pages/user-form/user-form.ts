import { HomePage } from '../home/home';
import { PopupService } from '../../providers/popup-service';
import { ConfirmPopup } from '../../components/confirm-popup/confirm-popup';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../providers/user.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, PopoverController } from 'ionic-angular';

/**
 * Generated class for the UserForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html'
})
export class UserForm {

  isLoading: boolean = false;
  user: User = <User>{ id: null, name: '', score: null };
  tabBarElement: any;
  operationText: string = 'Insert';

  @ViewChild('userForm') userForm: NgForm;

  constructor(  private navCtrl: NavController, 
                private navParams: NavParams, 
                private userService: UserService, 
                private loading: LoadingController,
                private popoverCtrl: PopoverController,
                private popupService: PopupService ) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    popupService._confirmed$.subscribe(res => { if(res === 'confirmed') console.log('confirmed')})
  }

  submit(): void {
    let loader = this.userService.createLoader();
    this.isLoading = true;
    loader.present().then(() => {
      if(this.user.id !== null) {
        this.userService.updateUser(this.user)
          .subscribe(() => {
            this.userForm.form.markAsPristine();
            this.navCtrl.pop();
            loader.dismiss(); 
          },
          err => {
            console.log('error in update user obs', err);
            loader.dismiss();
          })
      } else {
        this.userService.addUser(this.user)
          .subscribe(() => {
            this.userForm.form.markAsPristine();
            this.navCtrl.pop(); 
            loader.dismiss();
          },
          err => {
            console.log('error in insert user obs', err);
            loader.dismiss();
          })
      }
    })
    .catch(err => {
      this.isLoading = false;
      console.log('error in submit loader', err)
    })
  }

  getUser(id: number): void {
    this.isLoading = true;
    let loader = this.userService.createLoader();
    loader.present().then(() => {
      this.userService.getUser(id)
        .subscribe(user => {
          this.user = user;
          this.isLoading = false;
          loader.dismiss();
        },
        err => {
          console.log('err in get user obs', err);
          this.isLoading = false;
          loader.dismiss();
        })
    })
  }
  
  cancel(event: Event): void {
    event.preventDefault();
    if(this.userForm.dirty) {
      let popover = this.popoverCtrl.create(ConfirmPopup);
      popover.present({
        ev: event
      })
  
    } else {
      this.navCtrl.pop();
    }
  }

  delete(event: Event): void {
    event.preventDefault();
    let loader = this.userService.createLoader(`Deleting ${this.user.name}...`);
    loader.present()
      .then(() => {
        this.userService.removeUser(this.user)
          .subscribe(() => {
            loader.dismiss();
            this.navCtrl.pop();
          }
          , err => console.log(err))
      })
      .catch(err => console.log('err in delete user loader: ', err))
  }

  ionViewWillEnter() {
    // this.tabBarElement.style.display = 'none';
    let id = this.navParams.get('id');
    if(id) {
      this.getUser(id);
      this.operationText = 'Update';
    } 
  }
 
  ionViewWillLeave() {
    // this.tabBarElement.style.display = 'flex';
  }

}
