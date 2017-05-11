import { HomePage } from '../../pages/home/home';
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { PopupService } from '../../providers/popup-service';

/**
 * Generated class for the ConfirmPopup component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'confirm-popup',
  templateUrl: 'confirm-popup.html'
})
export class ConfirmPopup {

  constructor(private viewCtrl: ViewController, private popopService: PopupService) { }

  close() {
    this.viewCtrl.dismiss();
  }

  onConfirm() {
    this.popopService.confirm();
    this.viewCtrl.dismiss();
  }

}
