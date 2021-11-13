import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contacto } from '../../Modelos/contacto';
import { ContactoService } from '../../Principal/contacto.service';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-mantenedor-contacto',
  templateUrl: './mantenedor-contacto.component.html',
  styleUrls: ['./mantenedor-contacto.component.css']
})
export class MantenedorContactoComponent implements OnInit {

  contacto = new Contacto();
  contactos = null;
  det = null;
  persona = null;
  cargo:any[] = [];

  constructor(private rolService: RolService, private router: Router, private personaService: PersonaService, private contactoService: ContactoService) { }

  ngOnInit(): void 
  {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    this.listarContactos();
    this.listarPerfil();
    this.listarCargoAsignado();
    if(this.cargo.length == 0)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos
      }
    );
  }

  listarContactos()
  {
    this.contactoService.listarContacto().subscribe
    (
      (datos:any) => this.contactos = datos
    );
  }

  listarCargoAsignado()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');

    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].id_rol == 4 && datos[i].id_persona == id)
            {
              this.cargo.push(datos[i]);
            }
          }
        }
      }
    )
  }

  eliminarContacto(id)
  {
    this.contactoService.eliminarContacto(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'CONTACTO ELIMINADO',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'CONTACTO NO ELIMINADO',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
      }
    );
  }

  detalleContactoId(iden)
  {
    this.contactoService.detalleContacto(iden).subscribe
      (
        (datos: any) => (this.det = datos, this.listarContactos())
    );
  }
}
