import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './Componentes/footer/footer.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { MiembrosModule } from './Modulos/Miembros/miembros.module';
import { PrincipalModule } from './Modulos/Principal/principal.module';
import { ReactiveFormsModule } from '@angular/forms' 

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrincipalModule,
    MiembrosModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
