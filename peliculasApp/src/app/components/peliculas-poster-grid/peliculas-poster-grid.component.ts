import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../interfaces/cartelera.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styles: [
  ]
})
export class PeliculasPosterGridComponent implements OnInit {
  @Input() peliculaCartelera: Movie[];
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.peliculaCartelera);
  }
  onMovieClick(pelicula: Movie){

    this.router.navigate(['/pelicula',pelicula.id])
    // console.log(pelicula);
  }


}
