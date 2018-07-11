import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransactionHandlerProvider } from '../../providers/transaction-handler/transaction-handler';

@Component({
  selector: 'page-dev',
  templateUrl: 'dev.html',
})
export class DevPage {
  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public t: TransactionHandlerProvider,
  ) {}

  public ionViewDidLoad () {
    console.log('ionViewDidLoad DevPage');
  }

  public create () {
    const res = this.t.createTransaction({
      Type: 101,
      Data: 'testing',
    });
    res.then(console.log).catch(console.error);
  }
}
