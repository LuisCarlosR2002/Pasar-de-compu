import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera.interface';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() peliculaSlide: Movie[];
  public swiper: Swiper;

  constructor() { }
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {

      loop: true,
    
    });
    
  }
  onSlideNext(){
    this.swiper.slideNext()
  }
  onSlidePrev(){
    this.swiper.slidePrev();
  }


  ngOnInit(): void {

    // console.log(this.peliculaSlide);
    

  }
  
}
