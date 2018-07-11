import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-response-list',
  templateUrl: 'response-list.html',
})
export class ResponseListPage {
  public responses = [
    {
      id: '001',
      keywords: 'Traffic Volume',
      size: '40MB',
    },
    {
      id: '002',
      keywords: 'House Price',
      size: '60MB',
    },
  ];

  constructor (public navCtrl: NavController, public navParams: NavParams) {}

  public ionViewDidLoad () {
    console.log('ionViewDidLoad ResponseListPage');
  }

  public showResponseAccept () {}

  public showResponseUpdate () {}
}
