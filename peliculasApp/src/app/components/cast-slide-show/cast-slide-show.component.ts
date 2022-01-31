import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Cast } from '../../interfaces/cast.interface';
import Swiper from 'swiper';


@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styles: [
  ]
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() Cast:Cast[] = [];
  constructor() { }

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper-container',{
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    });
  }

  ngOnInit(): void {
    console.log(this.Cast);
  }

}
