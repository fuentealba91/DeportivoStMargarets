import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Contacto } from '../../Modelos/contacto';
import { ContactoService } from '../../Principal/contacto.service';

@Component({
  selector: 'app-mantenedor-contacto',
  templateUrl: './mantenedor-contacto.component.html',
  styleUrls: ['./mantenedor-contacto.component.css']
})
export class MantenedorContactoComponent implements OnInit {

  contacto = new Contacto();
  contactos = null;
  det = null;

  constructor(private contactoService: ContactoService) { }

  ngOnInit(): void 
  {
    this.listarContactos();
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
      (datos:any) => this.det = datos
    );
  }
}
