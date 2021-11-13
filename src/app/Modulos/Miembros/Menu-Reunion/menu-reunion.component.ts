import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirectivaService } from '../directiva.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-menu-reunion',
  templateUrl: './menu-reunion.component.html',
  styleUrls: ['./menu-reunion.component.css']
})
export class MenuReunionComponent implements OnInit {

  cargo:boolean = false;
  persona = null;

  constructor(private personaService: PersonaService, private directivaService: DirectivaService, private router: Router) { }

  ngOnInit(): void 
  {
    // si el usuario esta logeado se muestra, sino redirigir
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }
    this.listarDirectivas();
    this.listarPerfil();
  }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => this.persona = datos
      );
    
  }

  listarDirectivas()
  {
    this.directivaService.listarDirectivas().subscribe
    (
      (datos:any) => 
      {
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');

        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].cargo == 'presidente')
          {
            if(datos[i].id_Persona == id)
            {
              this.cargo = true;
            }
          }
        }
      }
    )
  }
}
