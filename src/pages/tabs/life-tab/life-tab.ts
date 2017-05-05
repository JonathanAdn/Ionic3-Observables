import { HomePage } from '../../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LifeTab page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-life-tab',
  templateUrl: 'life-tab.html',
})
export class LifeTab {

  constructor(private navCtrl: NavController, private navParams: NavParams) {
  }

  private gotoHomePage(): void {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LifeTab');
  }

}
