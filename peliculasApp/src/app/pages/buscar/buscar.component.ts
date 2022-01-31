import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  public texto: string;
  public peliculas: Movie[];
  constructor(private activatedRoute:ActivatedRoute, private peliculasService:PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.texto= params['id'];
      this.peliculasService.buscarPeliculas(params['id'])
        .subscribe( movies => {
         
          this.peliculas = movies;
        })
    })
  }

}
