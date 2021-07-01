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
import { CarruselComponent } from './Modulos/Principal/Carrusel/carrusel.component';
import { NoticiasEventosComponent } from './Modulos/Principal/Noticias-Eventos/noticias-eventos.component';
import { RamasComponent } from './Modulos/Principal/Ramas/ramas.component';
import { ContactoComponent } from './Modulos/Principal/Contacto/contacto.component';
import { MenuRolComponent } from './Modulos/Miembros/Menu-Rol/menu-rol.component';
import { MenuReunionComponent } from './Modulos/Miembros/menu-reunion/menu-reunion.component';
import { MultimediaComponent } from './Modulos/Principal/Multimedia/multimedia.component';
import { DirectivaComponent } from './Modulos/Principal/directiva/directiva.component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  // { path: '#noticias', component: NoticiasEventosComponent },
  //{ path: 'ramasDepor', component: RamasComponent },
  // { path: '#cont', component: ContactoComponent },
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
  { path: 'evento-deportivo', component: EventoDeportivoComponent },
  { path: 'menu-rol', component: MenuRolComponent },
  { path: 'menu-reunion', component: MenuReunionComponent },
  { path: 'multimedia', component: MultimediaComponent },
  { path: 'directiva', component: DirectivaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling:'enabled'
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
