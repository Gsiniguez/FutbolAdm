import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUser } from '../../models/user';

/**
 * Generated class for the ResetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpass',
  templateUrl: 'resetpass.html',
})
export class ResetpassPage {

  user = {} as IUser;

  constructor(public navCtrl: NavController, public navParams: NavParams,private fauth:AngularFireAuth) {
  }

  ionViewDidLoad() {
  }

  async resetPass(user:IUser){
    try{
      this.fauth.auth.sendPasswordResetEmail(user.email);
    }catch (e){
      
    }
  }

}
