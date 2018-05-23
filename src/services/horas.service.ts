import {Injectable} from '@angular/core'
import {AngularFireDatabase} from 'angularfire2/database'
import {AngularFireAuth} from 'angularfire2/auth'

@Injectable()
export class HorasService{

    
    constructor(public fdb:AngularFireDatabase,public fauth:AngularFireAuth){}

    public getHoras(){
        let data;
        this.fauth.authState.subscribe(auth =>{
        data = this.fdb.list(`cancha/${auth.uid}/lele`).valueChanges();
        });
        return data;
    }
}