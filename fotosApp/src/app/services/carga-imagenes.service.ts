import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { FileItem } from '../models/file-item.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs';

// import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';


  constructor( private db: AngularFirestore, private storage: AngularFireStorage) { }


  


  cargarImagenesFirebase(imagenes:FileItem[]){

    // console.log(imagenes);

    for( const item of imagenes){

      item.estadoSubiendo  = true;
      if(item.pogreso >=100){
        continue;
      }
      // const uploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombrearchivo}`)
      //       .put(item.archivo)

      // uploadTask.on (firebase.storage.TaskEvent.STATE_CHANGED,
      //   (snapshot:firebase.storage.UploadTaskSnapshot)=> {
      //     return item.pogreso = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
      //   },
      //   (error:any) => console.log('Error al subir '+ error),
      //   () => {
      //     console.log('Imagen cargada correctamnente')
      //     item.url = uploadTask.snapshot.downloadURL;
      //     item.estadoSubiendo = false;
      //     this.guardarImagen({
      //       nombre: item.nombrearchivo,
      //       url: item.url
      //     });
      //   }
        
      // )

      const file = item.archivo;
      const filePath = `${ this.CARPETA_IMAGENES }/${ item.nombrearchivo }`;
      const ref = this.storage.ref( filePath );
      const task = this.storage.upload(filePath, file);

      task.percentageChanges();
      task.snapshotChanges()
        .pipe(
          finalize(
            () => ref.getDownloadURL()
              .subscribe(url =>{

                console.log('Imagen cargada correctamnente')
                item.url = url;
                item.estadoSubiendo = false;
                this.guardarImagen({
                  nombre: item.nombrearchivo,
                  url: item.url
                })
              
              })
          ) 
        ).subscribe();

    }
    
  }
  private guardarImagen( imagen: {nombre: string, url:string}){

    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add(imagen)
  }
}
