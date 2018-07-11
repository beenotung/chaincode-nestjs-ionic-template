import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

import { config } from '../config';
import { DevPage } from '../pages/dev/dev';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  public rootPage: any = TabsPage;

  constructor (
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if (config.dev) {
      this.rootPage = DevPage;
    }
  }
}
