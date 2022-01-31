import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  
  @HostListener('window: scroll',['$event'])
  onScroll(){
   
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) +1400;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){

      if(this.peliculaServices.cargando) {
        return;
      }

      this.peliculaServices.getCartelera()
        .subscribe( (movies) =>{
          this.peliculas.push(...movies);
        })
    }
    console.log({pos,max});
  }

  peliculaSlide:Movie[] = [];
  
  peliculas:Movie[] = [];
  constructor(private peliculaServices: PeliculasService) { }

  ngOnDestroy(): void {
    this.peliculaServices.resetPage();
  }

  ngOnInit(): void {

    this.peliculaServices.getCartelera()
    .subscribe( movies => {
      
      // console.log(res.results);
      this.peliculaSlide = movies;
      this.peliculas = movies;
    })

  }

  
}
