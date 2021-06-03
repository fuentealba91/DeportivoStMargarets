import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Contacto } from '../../Modelos/contacto';
import { ContactoService } from '../contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit 
{

  contacto = new Contacto();

  constructor(private contactoService: ContactoService) { }

  ngOnInit(): void 
  {
    (function () 
    {
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) 
          {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  Enviar()
  {
    if(this.contactoService.validarCampos(this.contacto)==1)
    {
      this.contactoService.EnviarMensaje(this.contacto).subscribe
        (
          datos =>
          {
            if(datos['respuesta'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'SOLICITUD ENVIADA',
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
                text: 'ERROR AL ENVIAR LA SOLICITUD',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
            }
          }
        );
    }
    else
    {
      Swal.fire
      ({
        title: '',
        text: 'DEBE LLENAR TODOS LOS CAMPOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }
}
