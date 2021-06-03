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
      AsignacionRolComponent
  ],
  imports: 
  [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: 
  [
    PerfilComponent
  ]
})
export class MiembrosModule { }
