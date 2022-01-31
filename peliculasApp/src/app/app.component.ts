import { Component } from '@angular/core';
import { PeliculasService } from './services/peliculas.service';
import { Welcome } from './interfaces/cartelera.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private peliculaservices:PeliculasService){
    

  }
  title = 'peliculasApp';
}
