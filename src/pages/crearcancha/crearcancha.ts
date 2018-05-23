import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ICancha } from '../../models/cancha';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { IHoras } from '../../models/horas';

/**
 * Generated class for the CrearcanchaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crearcancha',
  templateUrl: 'crearcancha.html',
})
export class CrearcanchaPage {

  public cancha = {} as ICancha;
  public horas = {};
  today;
  


  constructor(private alertCtrl:AlertController,private fauth:AngularFireAuth,private fdb:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.today = this.calculateTime('-3');
    console.log(this.today);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearcanchaPage');
  }

  calculateTime(offset: any) {
    // create Date object for current location
    let d = new Date();

    // create new Date object for different city
    // using supplied offset
    let nd = new Date(d.getTime() + (3600000 * offset));

    return nd.toISOString();
  }

  canchaNueva(cancha:ICancha,horas){
    
    horas = [
      horas.doceam=false,
      horas.unaam=false,
      horas.dosam=false,
      horas.tresam=false,
      horas.cuatroam=false,
      horas.cincoam=false,
      horas.seisam=false,
      horas.sieteam=false,
      horas.ochoam=false,
      horas.nueveam=false,
      horas.diezam=false,
      horas.onceam=false,
      horas.docepm=false,
      horas.unapm=false,
      horas.dospm=false,
      horas.trespm=false,
      horas.cuatropm=false,
      horas.cincopm=false,
      horas.seispm=false,
      horas.sietepm=false,
      horas.ochopm=false,
      horas.nuevepm=false,
      horas.diezpm=false,
      horas.oncepm=false,  
   ];
  
    this.fauth.authState.subscribe(auth =>{
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0,10)}/${this.cancha.nombre}`).valueChanges().subscribe(data => {
        if(data == null){
          this.fdb.list(`${auth.uid}/${nombre.key}/${this.today.substring(0,10)}`).set(this.cancha.nombre,this.horas).then(()=>this.navCtrl.setRoot(HomePage));
        }else{
          //FALTA ERROR ACA =>>
          //this.navCtrl.setRoot(HomePage);
        }
      })
      })
      
    })
  }

  showError(text){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK'],
    });
    alert.present();
    
  }

}
