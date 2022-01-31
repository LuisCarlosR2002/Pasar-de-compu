import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapaEditarComponent } from './components/mapa/mapa-editar.component';
import { ReactiveFormsModule } from '@angular/forms';






@NgModule({
  entryComponents:[
    MapaEditarComponent
  ],
  declarations: [
    AppComponent,
    MapaComponent,
    MapaEditarComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({apiKey:"AIzaSyDV-40s50eFg-9P3E-2qJAvvXuq_7WLgnE"}),
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
