import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './Perfil/perfil.component';
import { PersonaComponent } from './Persona/persona.component';
import { RolComponent } from './Rol/rol.component';
import { FormsModule } from '@angular/forms';
import { TipoReunionComponent } from './Tipo-Reunion/tipo-reunion.component';
import { MantenedorContactoComponent } from './mantenedor-contacto/mantenedor-contacto.component';
import { ReunionComponent } from './reunion/reunion.component';
import { MenuPrincipalComponent } from './Menu-Principal/menu-principal/menu-principal.component';
import { RouterModule } from '@angular/router';
import { DeporteComponent } from './deporte/deporte/deporte.component';
import { AsignacionRolComponent } from './Asignacion-Roles/asignacion-rol/asignacion-rol.component';
import { EventoDeportivoComponent } from './evento-deportivo/evento-deportivo.component';
import { MenuRolComponent } from './Menu-Rol/menu-rol.component';
import { MenuReunionComponent } from './menu-reunion/menu-reunion.component';
import { SidebarComponent } from 'src/app/Componentes/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: 
  [
    PerfilComponent, 
      PersonaComponent,
      RolComponent,
      TipoReunionComponent,
      MantenedorContactoComponent,
      ReunionComponent,
      MenuPrincipalComponent,
      DeporteComponent,
      AsignacionRolComponent,
      EventoDeportivoComponent,
      MenuRolComponent,
      MenuReunionComponent,
      SidebarComponent
  ],
  imports: 
  [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  exports: 
  [
    PerfilComponent
  ]
})
export class MiembrosModule { }
