import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  public account: { name: string; password: string } = {
    name: 'Alice',
    password: 'AliceAlice',
  };

  private accountErrorString: string;

  constructor (
    public navCtrl: NavController,
    private accountService: AccountProvider,
    private toastCtl: ToastController,
    public navParams: NavParams,
  ) {}

  public ionViewDidLoad () {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  public CreateAccount () {
    /* this.accountService.signin(this.account).subscribe((resp) => {
      this.navCtrl.push(HomePage);
    }, (err) => {

      this.navCtrl.push(HomePage);

      // Unable to sign up
      let toast = this.toastCtl.create({
        message: this.accountErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }*/
  }
}
