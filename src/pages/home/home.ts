import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { CrearcanchaPage } from '../crearcancha/crearcancha';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ICancha } from '../../models/cancha';
import { IHoras } from '../../models/horas';
import { BorrarcanchaPage } from '../borrarcancha/borrarcancha';
import { INombre } from '../../models/nombe';
import { DatosPage } from '../datos/datos';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  horas = {};
  today = this.calculateTime('-3');
  minday;
  maxday;
  oneday;
  twoday;
  threeday;
  fourday;
  fiveday;
  sixday;
  sevenday;
  cancha: string = 'Cancha1';
  canchatitulo: string = 'CANCHA 1';
  canchacambio: string = "Cancha1";
  mostrarCancha1: boolean;
  mostrarCancha2: boolean;
  mostrarCancha3: boolean;
  mostrarCancha4: boolean;
  mostrarCancha5: boolean;
  mostrarCancha6: boolean;
  mostrarCancha7: boolean;
  mostrarCancha8: boolean;

  //Variable para semana;
  horassemana = {};
  nombresemana: ICancha;


  constructor(private fauth: AngularFireAuth, public navParams: NavParams, public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.onDateClick();
    this.selectCancha(this.cancha);
    this.minday = this.calculateTime('-3');
    this.maxday = this.calculateTime('165');
    this.oneday = this.calculateTime('21');
    this.twoday = this.calculateTime('45');
    this.threeday = this.calculateTime('69')
    this.fourday = this.calculateTime('93');
    this.fiveday = this.calculateTime('117');
    this.sixday = this.calculateTime('141');
    this.sevenday = this.calculateTime('165');

  }



  cambiarTitulo() {
    if (this.cancha === 'Cancha1') {
      this.canchatitulo = "CANCHA 1";
    } else if (this.cancha === 'Cancha2') {
      this.canchatitulo = 'CANCHA 2'
    } else if (this.cancha === 'Cancha3') {
      this.canchatitulo = 'CANCHA 3';
    } else if (this.cancha === 'Cancha4') {
      this.canchatitulo = 'CANCHA 4';
    } else if (this.cancha === 'Cancha5') {
      this.canchatitulo = 'CANCHA 5';
    } else if (this.cancha === 'Cancha6') {
      this.canchatitulo = 'CANCHA 6';
    } else if (this.cancha === 'Cancha7') {
      this.canchatitulo = 'CANCHA 7';
    } else if (this.cancha === 'Cancha8') {
      this.canchatitulo = 'CANCHA 8';
    }
  }

  calculateTime(offset: any) {
    let d = new Date();
    let nd = new Date(d.getTime() + (3600000 * offset));
    return nd.toISOString();
  }

  updateHora() {
    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/${this.canchacambio}`).update(this.horas)
      })
    })
  }

  onDateClick() {
    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/${this.canchacambio}`).valueChanges().subscribe(data => {
          if (data != null) {
            this.horas = data
          }
        })
      });
    })

  }

  selectCancha(cancha: string) {
    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/${cancha}`).valueChanges().subscribe(data => {
          if (data != null) {
            this.horas = data
          }else{
            this.navCtrl.setRoot(CrearcanchaPage);
          }
        })
      })
    });
    this.cancha = cancha;
    this.canchacambio = cancha;
    this.actualizarSemana(this.canchacambio);
    this.cambiarTitulo();
  }

  public logout() {
    this.fauth.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    })
  }

  public nuevaCancha() {
    this.navCtrl.push(CrearcanchaPage);
  }

  public borrarCancha() {
    this.navCtrl.push(BorrarcanchaPage);
  }

  actualizarSemana(cancha) {
    let horas = {} as IHoras;
    [
      horas.doceam = false,
      horas.unaam = false,
      horas.dosam = false,
      horas.tresam = false,
      horas.cuatroam = false,
      horas.cincoam = false,
      horas.seisam = false,
      horas.sieteam = false,
      horas.ochoam = false,
      horas.nueveam = false,
      horas.diezam = false,
      horas.onceam = false,
      horas.docepm = false,
      horas.unapm = false,
      horas.dospm = false,
      horas.trespm = false,
      horas.cuatropm = false,
      horas.cincopm = false,
      horas.seispm = false,
      horas.sietepm = false,
      horas.ochopm = false,
      horas.nuevepm = false,
      horas.diezpm = false,
      horas.oncepm = false,
    ];
    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.oneday.substring(0, 10)}/${cancha}`).valueChanges().subscribe(data => {
          if (data == null) {
            this.fdb.list(`${auth.uid}/${nombre.key}/${this.oneday.substring(0, 10)}`).set(cancha, horas);
          }
        });
      })

      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.twoday.substring(0, 10)}/${cancha}`).valueChanges().subscribe(data => {
          if (data == null) {
            this.fdb.list(`${auth.uid}/${nombre.key}/${this.twoday.substring(0, 10)}`).set(cancha, horas);
          }
        })
      })

      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.threeday.substring(0, 10)}/${cancha}`).valueChanges().subscribe(data => {
          if (data == null) {
            this.fdb.list(`/${auth.uid}/${nombre.key}/${this.threeday.substring(0, 10)}`).set(cancha, horas);
          }
        })
      })

      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.fourday.substring(0, 10)}/${cancha}`).valueChanges().subscribe(data => {
          if (data == null) {
            this.fdb.list(`${auth.uid}/${nombre.key}/${this.fourday.substring(0, 10)}`).set(cancha, horas);
          }
        })
      })

      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.fiveday.substring(0, 10)}/${cancha}`).valueChanges().subscribe(data => {
          if (data == null) {
            this.fdb.list(`${auth.uid}/${nombre.key}/${this.fiveday.substring(0, 10)}`).set(cancha, horas);
          }
        })
      })

      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.sixday.substring(0, 10)}/${cancha}`).valueChanges().subscribe(data => {
          if (data == null) {
            this.fdb.list(`${auth.uid}/${nombre.key}/${this.sixday.substring(0, 10)}`).set(cancha, horas);
          }
        })
      })

      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.sevenday.substring(0, 10)}/${cancha}`).valueChanges().subscribe(data => {
          if (data == null) {
            this.fdb.list(`${auth.uid}/${nombre.key}/${this.sevenday.substring(0, 10)}`).set(cancha, horas);
          }
        })
      })
    })

  }

  public editarDatos(){
    this.navCtrl.push(DatosPage);
  }

  ionViewDidLoad() {
    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/Cancha1`).valueChanges().subscribe(data => {
          if (data != null) {
            this.mostrarCancha1 = true;
          }
        });
      })
    });

    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/Cancha2`).valueChanges().subscribe(data => {
          if (data != null) {
            this.mostrarCancha2 = true;
          }
        });
      })

    });

    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/Cancha3`).valueChanges().subscribe(data => {
          if (data != null) {
            this.mostrarCancha3 = true;
          }
        });
      })

    });

    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/Cancha4`).valueChanges().subscribe(data => {
          if (data != null) {
            this.mostrarCancha4 = true;
          }
        });
      })

    });

    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/Cancha5`).valueChanges().subscribe(data => {
          if (data != null) {
            this.mostrarCancha5 = true;
          }
        });
      })

    });

    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/Cancha6`).valueChanges().subscribe(data => {
          if (data != null) {
            this.mostrarCancha6 = true;
          }
        });
      })

    });

    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/Cancha7`).valueChanges().subscribe(data => {
          if (data != null) {
            this.mostrarCancha7 = true;
          }
        });
      })

    });

    this.fauth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/`).stateChanges().subscribe(nombre => {
        this.fdb.object(`${auth.uid}/${nombre.key}/${this.today.substring(0, 10)}/Cancha8`).valueChanges().subscribe(data => {
          if (data != null) {
            this.mostrarCancha8 = true;
          }
        });
      })

    });


  }



}
