import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie.interface';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';
import { Cast, CastElement } from '../../interfaces/cast.interface';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieDetails;
  public cast: CastElement[] = [];

  constructor( private activatedRoute:ActivatedRoute, private peliculasService: PeliculasService, private location: Location, private router: Router ) { }

  ngOnInit(): void {

    const {id}  = this.activatedRoute.snapshot.params;

    combineLatest([

      this.peliculasService.getpeliculaDetalles(id),
      this.peliculasService.getCast(id)

    ]).subscribe( obj => {
      const pelicula = obj[0];
      const Cast = obj[1];
      if(!pelicula){

        this.router.navigateByUrl('/home');
        return
      }
      this.pelicula = pelicula;

      this.cast = Cast.filter( actor => actor.profile_path != null);

    })
      
    
  //   console.log(id);
  //   this.peliculasService.getpeliculaDetalles(id)
  //     .subscribe( movie => {

  //       if(!movie){
  //         this.router.navigateByUrl('/home');
  //         return
  //       }
  //       this.pelicula = movie;

  //       console.log(this.pelicula.poster_path);
  //     })

  //   this.peliculasService.getCast(id)
  //     .subscribe( movie => {
  //       this.cast = movie.filter( actor => actor.profile_path != null);
  //       console.log(movie);
  //     })
  }
  onRegresar(){
    this.location.back();
  }
}
