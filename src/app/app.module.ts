import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LifeTab } from '../pages/tabs/life-tab/life-tab';
import { WaterTab } from '../pages/tabs/water-tab/water-tab';
import { Tabs } from '../pages/tabs/tabs';
import { UserForm } from '../pages/user-form/user-form';
import { ConfirmPopup } from '../components/confirm-popup/confirm-popup';

import { UserService } from '../providers/user.service';
import { PopupService } from '../providers/popup-service';

import { FilterBy } from '../pipes/filter-by';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LifeTab,
    WaterTab,
    Tabs,
    FilterBy,
    UserForm,
    ConfirmPopup
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  exports: [
    FilterBy
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LifeTab,
    WaterTab,
    Tabs,
    UserForm,
    ConfirmPopup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    PopupService
  ]
})
export class AppModule {}
