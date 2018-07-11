import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { DevPage } from '../pages/dev/dev';
import { RequestDataPage } from '../pages/request-data/request-data';
import { RequestListPage } from '../pages/request-list/request-list';
import { ResponseListPage } from '../pages/response-list/response-list';
import { AccountProvider } from '../providers/account/account';
import { BlockHandlerProvider } from '../providers/block-handler/block-handler';
import { HashProvider } from '../providers/hash/hash';
import { RequestProvider } from '../providers/request/request';
import { SignatureProvider } from '../providers/signature/signature';
import { TransactionHandlerProvider } from '../providers/transaction-handler/transaction-handler';
import { TransactionMockProvider } from '../providers/transaction-mock/transaction-mock';
import { UserHandlerProvider } from '../providers/user-handler/user-handler';

@NgModule({
  declarations: [
    MyApp,
    DevPage,
    TabsPage,
    RequestListPage,
    ResponseListPage,
    RequestDataPage,
    CreateAccountPage,
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DevPage,
    TabsPage,
    RequestListPage,
    ResponseListPage,
    RequestDataPage,
    CreateAccountPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClient,
    RequestProvider,
    AccountProvider,
    TransactionHandlerProvider,
    UserHandlerProvider,
    BlockHandlerProvider,
    TransactionMockProvider,
    SignatureProvider,
    HashProvider,
  ],
})
export class AppModule {}
