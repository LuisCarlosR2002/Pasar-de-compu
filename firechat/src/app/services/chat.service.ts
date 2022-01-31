import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<mensaje>;
  public chats :mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) { 
    this.auth.authState.subscribe(user => {
      console.log(user);

      if(!user){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;

    });
  }

  login(proveedor:string) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.auth.signOut();
  }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<mensaje>('chats',ref => ref.orderBy('fecha','desc').limit(5));

    return this.itemsCollection.valueChanges()
      .pipe(
            map((mensajes:mensaje[]) => {
              console.log(mensajes)
              this.chats = [];
              for(let mensaje of mensajes){
                this.chats.unshift(mensaje);
              }
              return this.chats;
              // this.chats = mensajes;
            }))
  }
  agregarMensaje(texto:string ){
    let Mensaje: mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemsCollection.add(Mensaje);
    
  }
}
