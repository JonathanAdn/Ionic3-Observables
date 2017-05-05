import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaterTab } from './water-tab';

@NgModule({
  declarations: [
    WaterTab,
  ],
  imports: [
    IonicPageModule.forChild(WaterTab),
  ],
  exports: [
    WaterTab
  ]
})
export class WaterTabModule {}
