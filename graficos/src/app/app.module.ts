import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgChartsModule } from 'ng2-charts';
import { LineaComponent } from './components/linea/linea.component';
import { BarraComponent } from './components/barra/barra.component';
import { DonaComponent } from './components/dona/dona.component';
import { RadarComponent } from './components/radar/radar.component'



@NgModule({
  declarations: [
    AppComponent,
    LineaComponent,
    BarraComponent,
    DonaComponent,
    RadarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
