import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item.model';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];

  estaSobreElemento: boolean = false;

  constructor(public cargaImagenesService: CargaImagenesService) { }

  ngOnInit(): void {
  }
  cargarImagen(){
    
    this.cargaImagenesService.cargarImagenesFirebase(this.archivos)

  }
  limpiarArchivos(){
    
    this.archivos = [];
  }
}
