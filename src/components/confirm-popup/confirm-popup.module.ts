import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPopup } from './confirm-popup';

@NgModule({
  declarations: [
    ConfirmPopup,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPopup),
  ],
  exports: [
    ConfirmPopup
  ]
})
export class ConfirmPopupModule {}
