import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ICancha } from '../../models/cancha';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-borrarcancha',
  templateUrl: 'borrarcancha.html',
})
export class BorrarcanchaPage {
  public cancha = {} as ICancha;  
  today = this.calculateTime('-3');
  oneday = this.calculateTime('21');
  twoday = this.calculateTime('45');
  threeday = this.calculateTime('69')
  fourday = this.calculateTime('93');
  fiveday = this.calculateTime('117');
  sixday = this.calculateTime('141');
  sevenday = this.calculateTime('165');

  constructor(private fauth:AngularFireAuth,private fdb:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
  }

  calculateTime(offset: any) {
    let d = new Date();
    let nd = new Date(d.getTime() + (3600000 * offset));
    return nd.toISOString();
  }

  borrarCancha(cancha:ICancha){
    this.fauth.authState.subscribe(auth =>{
      this.fdb.object(`cancha/${auth.uid}/${this.today.substring(0,10)}/${this.cancha.nombre}`).remove();
      this.fdb.object(`cancha/${auth.uid}/${this.oneday.substring(0,10)}/${this.cancha.nombre}`).remove();
      this.fdb.object(`cancha/${auth.uid}/${this.twoday.substring(0,10)}/${this.cancha.nombre}`).remove();
      this.fdb.object(`cancha/${auth.uid}/${this.threeday.substring(0,10)}/${this.cancha.nombre}`).remove();
      this.fdb.object(`cancha/${auth.uid}/${this.fourday.substring(0,10)}/${this.cancha.nombre}`).remove();
      this.fdb.object(`cancha/${auth.uid}/${this.fiveday.substring(0,10)}/${this.cancha.nombre}`).remove();
      this.fdb.object(`cancha/${auth.uid}/${this.sixday.substring(0,10)}/${this.cancha.nombre}`).remove();
      this.fdb.object(`cancha/${auth.uid}/${this.sevenday.substring(0,10)}/${this.cancha.nombre}`).remove();
    })

    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrarcanchaPage');
  }

}
