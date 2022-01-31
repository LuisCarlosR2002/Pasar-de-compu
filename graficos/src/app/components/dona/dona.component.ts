import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {

  // Doughnut
  random:number[] =[];
  public doughnutChartLabels: string[] = ['Tamales', 'Arepa', 'Chorizo'];

 
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [300,500,400] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  numerosRandom(){
    
   

    return Math.random()*100,Math.random()*100,Math.random()*100
    
  }
}
