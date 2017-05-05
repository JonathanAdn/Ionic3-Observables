import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LifeTab } from './life-tab';

@NgModule({
  declarations: [
    LifeTab,
  ],
  imports: [
    IonicPageModule.forChild(LifeTab),
  ],
  exports: [
    LifeTab
  ]
})
export class LifeTabModule {}
