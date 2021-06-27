import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionRolComponent } from './Modulos/Miembros/Asignacion-Roles/asignacion-rol/asignacion-rol.component';
import { DeporteComponent } from './Modulos/Miembros/deporte/deporte/deporte.component';
import { EventoDeportivoComponent } from './Modulos/Miembros/evento-deportivo/evento-deportivo.component';
import { MantenedorContactoComponent } from './Modulos/Miembros/mantenedor-contacto/mantenedor-contacto.component';
import { MenuPrincipalComponent } from './Modulos/Miembros/Menu-Principal/menu-principal/menu-principal.component';
import { PerfilComponent } from './Modulos/Miembros/Perfil/perfil.component';
import { PersonaComponent } from './Modulos/Miembros/Persona/persona.component';
import { ReunionComponent } from './Modulos/Miembros/reunion/reunion.component';
import { RolComponent } from './Modulos/Miembros/Rol/rol.component';
import { TipoReunionComponent } from './Modulos/Miembros/Tipo-Reunion/tipo-reunion.component';
import { InicioComponent } from './Modulos/Principal/Inicio/inicio.component';
import { LoginComponent } from './Modulos/Principal/Login/login.component';
import { RecuperarClaveComponent } from './Modulos/Principal/Recuperar-Contraseña/recuperar-clave/recuperar-clave.component';
import { RegistroComponent } from './Modulos/Principal/Registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'rol', component: RolComponent },
  { path: 'tipo-reunion', component: TipoReunionComponent },
  { path: 'mantenedor-contacto', component: MantenedorContactoComponent },
  { path: 'persona', component: PersonaComponent },
  { path: 'menu-principal', component: MenuPrincipalComponent },
  { path: 'recuperar-contraseña', component: RecuperarClaveComponent },
  { path: 'deporte', component: DeporteComponent },
  { path: 'asignar-rol', component: AsignacionRolComponent },
  { path: 'reunion', component: ReunionComponent },
  { path: 'evento-deportivo', component: EventoDeportivoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
