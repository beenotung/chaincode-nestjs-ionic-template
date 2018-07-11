import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-request-list',
  templateUrl: 'request-list.html',
})
export class RequestListPage {
  public requests = [
    {
      id: '001',
      keywords: 'Temperature',
      bonus: 50,
    },
    {
      id: '002',
      keywords: 'Weather',
      bonus: 50,
    },
  ];
  constructor (public navCtrl: NavController, public navParams: NavParams) {}

  public ionViewDidLoad () {
    console.log('ionViewDidLoad RequestListPage');
  }
  public showRequestResponse () {}

  public showRequestUpdate () {}
}
