import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item.model';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output()mouseSobre:EventEmitter<boolean> = new EventEmitter(); 

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any){
    this.mouseSobre.emit(true)
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any){
    this.mouseSobre.emit(false)
  }

  @HostListener('drop', ['$event'])
  public onDrops( event: any){
    
    const transferencia = this._getTransferencia(event);   
    if(!transferencia){
      return;
    } 
    this._extraerAcrhivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);

  }
  

  private _getTransferencia(evento:any){

    return evento.dataTransfer ? evento.dataTransfer : evento.originalEvent.dataTransfer;

  }

  private _extraerAcrhivos(archivosLista:FileList){
    
    // console.log(archivosLista);

    for( const propiedad in Object.getOwnPropertyNames(archivosLista)){

      const archivoTemporal = archivosLista[propiedad];

      if(this._archivoPuedeSerCargado(archivoTemporal)){

        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }

    }

    console.log(this.archivos);
    
  }

  private _prevenirDetener(event:any){

    event.preventDefault();
    event.stopPropagation();

  }

  private _archivoYaFueDropeado( nombreArchivo: string):boolean{

    for(const archivo of this.archivos){
      if(archivo.nombrearchivo == nombreArchivo){
        console.log('El archivo '+nombreArchivo+ ' Ya esta agregado');
        return true;
      }
    }

    return false;
    
  }

  private _esImagen (tipoArchivo:string):boolean{
    return (tipoArchivo == '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image')
  }

  private _archivoPuedeSerCargado(archivo:File):boolean{
    if(!this._archivoYaFueDropeado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    }
    else{
      return false;
    }
  }


}
