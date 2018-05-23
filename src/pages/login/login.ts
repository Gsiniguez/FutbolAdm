import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { IUser } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { ResetpassPage } from '../resetpass/resetpass';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as IUser;


  constructor(private alertCtrl:AlertController,private fdb: AngularFireDatabase,private fauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

 

  ionViewDidLoad() {
    this.fauth.authState
      .subscribe(auth => {
        if (auth) {
          this.navCtrl.setRoot(HomePage);
          // Redirect to logged in page
        } else {
          
          // Redirect to logged out page
        }
      });
  }


  async login(user:IUser){
    try{
      await this.fauth.auth.signInWithEmailAndPassword(user.email,user.password);
      this.navCtrl.setRoot(HomePage);
    }catch(e){
      this.showError('Cuenta Incorrecta.');
    }  
  }
  
  showError(text){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK'],
    });
    alert.present();
  }

  resetPass(){
    this.navCtrl.push(ResetpassPage);
  }

}
