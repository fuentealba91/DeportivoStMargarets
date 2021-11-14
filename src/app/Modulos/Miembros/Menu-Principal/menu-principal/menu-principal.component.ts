import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactoService } from 'src/app/Modulos/Principal/contacto.service';
import { DirectivaService } from '../../directiva.service';
import { PersonaService } from '../../persona.service';
import { RolService } from '../../rol.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  public contador = 0;
  public persona = null;
  // cargo: any[] = [];
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
  

  constructor(
    private directivaService: DirectivaService,
    private rolService: RolService, 
    private contactoService: ContactoService, 
    private personaService: PersonaService, 
    private router: Router)
  {
    
  }

  ngOnInit(): void {
    
    // si el usuario esta logeado se muestra, sino redirigir
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    this.listarPerfil();
    this.listarContactoNuevo();
    this.listarCargos();
    this.listarCargosDirectiva();
    // this.listarCargoAsignado();
  }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => this.persona = datos
      );
    
  }

  listarContactoNuevo()
  {
    this.contactoService.listarContactoNuevo().subscribe
    (
      (datos:any) => this.contador = datos
    );
  }

  listarCargosDirectiva()
  {
    this.directivaService.listarDirectivas().subscribe
    (
      (datos:any) => 
      {
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');
        
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].cargo == 'presidente' && datos[i].id_Persona == id)
            {
              sessionStorage.setItem("rolPresidente", 'si');
            }
            if(datos[i].cargo == 'secretario' && datos[i].id_Persona == id)
            {
              sessionStorage.setItem("rolSecreDir", 'si');
            }
          }
        }
      }
    )
  }
  // listarCargoAsignado()
  // {
  //   let id: number = parseInt(sessionStorage.getItem("id") || '{}');

  //   this.rolService.listarRolAsignado().subscribe
  //   (
  //     (datos:any) => {
  //       if(datos)
  //       {
  //         for(let i=0;i<datos.length;i++)
  //         {
  //           if((datos[i].id_rol == 4 || datos[i].id_rol == 1)  && datos[i].id_persona == id)
  //           {
  //             this.cargo.push(datos[i]);
  //           }
  //         }
  //       }
  //     }
  //   )
  // }

  listarCargos()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');

    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].id_rol == 1 && datos[i].id_persona == id)
            {
              sessionStorage.setItem("rolAdmin", 'si');
            }
            if(datos[i].id_rol == 2 && datos[i].id_persona == id)
            {
              sessionStorage.setItem("rolSocio", 'si');
            }
            if(datos[i].id_rol == 4 && datos[i].id_persona == id)
            {
              sessionStorage.setItem("rolSecretario", 'si');
            }
            if(datos[i].id_rol == 5 && datos[i].id_persona == id)
            {
              sessionStorage.setItem("rolDeportista", 'si');
            }
            if(datos[i].id_rol == 16 && datos[i].id_persona == id)
            {
              sessionStorage.setItem("rolEntrenador", 'si');
            }
          }
        }
      }
    )
  }
}
