import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { IDatos } from '../../models/datos';

/**
 * Generated class for the DatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html',
})
export class DatosPage {

  datos = {} as IDatos
  dat = {}

  constructor(private fdb:AngularFireDatabase,private fauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/PERFIL`).valueChanges().subscribe(datos => {
          this.dat = datos;
        })
      })
    })
  }


  updateDatos(datos:IDatos){
    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/PERFIL`).update(datos);
      })
    })
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosPage');
  }



}
