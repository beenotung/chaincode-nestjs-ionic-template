import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';

@Component({
  selector: 'page-request-data',
  templateUrl: 'request-data.html',
})
export class RequestDataPage {
  public data = {
    keyword: 'keyword',
    price: 0,
  };

  constructor (
    public navCtrl: NavController,
    private requestService: RequestProvider,
    private toastCtl: ToastController,
    public navParams: NavParams,
  ) {}

  public ionViewDidLoad () {
    console.log('ionViewDidLoad RequestDataPage');
  }

  public requestData () {
    if (this.data.price < 0) {
      this.toastCtl
        .create({
          message: 'Bonus cannot be negative',
          duration: 2000,
          dismissOnPageChange: true,
        })
        .present();
      return;
    }
    console.log('call service');
    this.requestService.create(this.data).subscribe((res) => {
      console.log('res=', res);
    });
  }
}
