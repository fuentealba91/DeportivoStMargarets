import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contacto } from '../../Modelos/contacto';
import { ContactoService } from '../../Principal/contacto.service';
import { PersonaService } from '../persona.service';

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

  constructor(private router: Router, private personaService: PersonaService, private contactoService: ContactoService) { }

  ngOnInit(): void 
  {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    this.listarContactos();
    this.listarPerfil();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos,
        console.log(this.persona)
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
