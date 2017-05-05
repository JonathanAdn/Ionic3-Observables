import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LifeTab } from './life-tab/life-tab';
import { WaterTab } from './water-tab/water-tab';

/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

  private tab1Root: any;
  private tab2Root: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.tab1Root = WaterTab;
    this.tab2Root = LifeTab;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs');
  }

}
