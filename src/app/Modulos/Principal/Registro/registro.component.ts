import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PersonaService } from '../../Miembros/persona.service';
import { Persona } from '../../Modelos/persona';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  persona = new Persona();
  personas = null;
  det = null;

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
  }

  validarClaves()
  {
    if(this.persona.clave == this.det)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  crearCuenta()
  {
    if(this.validarClaves()==true)
    {
      this.personaService.crearCuenta(this.persona).subscribe
      (
        datos=>
        {
          if(datos['respuesta'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'CUENTA CREADA',
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
              text: 'CUENTA NO CREADA',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
          }
        }
      )
    }
    else
    {
      Swal.fire
      ({
        title: '',
        text: 'LAS CLAVES DEBEN SER IGUALES',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }
}
