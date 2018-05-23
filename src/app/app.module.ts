import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth"
import {AngularFireDatabaseModule} from "angularfire2/database"
import { firebaseConfig } from './app.firebase.config';
import { LoginPage } from '../pages/login/login';
import { CrearcanchaPage } from '../pages/crearcancha/crearcancha';
import { ResetpassPage } from '../pages/resetpass/resetpass';
import { HorasService } from '../services/horas.service';
import {Injectable} from '@angular/core';
import { BorrarcanchaPage } from '../pages/borrarcancha/borrarcancha';
import { DatosPage } from '../pages/datos/datos';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CrearcanchaPage,
    ResetpassPage,
    BorrarcanchaPage,
    DatosPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CrearcanchaPage,
    ResetpassPage,
    BorrarcanchaPage,
    DatosPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    [HorasService],
  ]
})
export class AppModule {}
