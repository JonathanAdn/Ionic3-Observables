import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserForm } from './user-form';

@NgModule({
  declarations: [
    UserForm,
  ],
  imports: [
    IonicPageModule.forChild(UserForm),
  ],
  exports: [
    UserForm
  ]
})
export class UserFormModule {}
