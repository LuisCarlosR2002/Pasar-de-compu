import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Welcome, Movie } from '../interfaces/cartelera.interface';
import { tap,map, catchError } from 'rxjs/operators';
import { MovieDetails } from '../interfaces/movie.interface';
import { Cast, CastElement } from '../interfaces/cast.interface';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string ="https://api.themoviedb.org/3";
  private carteleraPage = 1;
  public cargando:boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return{
      api_key:'d6c6aede050daada560824170fb18171',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<Movie[]>{

    if(this.cargando){
      return of([]);
    }

    this.cargando = true;

    return this.http.get<Welcome>(`${ this.baseUrl }/movie/popular`,{
      params: this.params
    }).pipe(
      map( res => res.results),
      tap( ()=> {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    )
   
  }

  resetPage(){
    this.carteleraPage = 1;
  }

  buscarPeliculas(texto:string):Observable<Movie[]>{

    const params  = {...this.params, page:'1', query: texto};

    return this.http.get<Welcome>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(
      map(res => res.results)
    )
  }
  
  getpeliculaDetalles(id:string){

    return this.http.get<MovieDetails>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    )

  }
  getCast(id:string):Observable<CastElement[]>{

    return this.http.get<Cast>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( res => res.cast),
      catchError(err => of(null))
    )
   
  }
}
