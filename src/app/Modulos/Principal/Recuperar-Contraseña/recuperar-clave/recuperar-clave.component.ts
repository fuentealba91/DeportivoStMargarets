import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PersonaService } from 'src/app/Modulos/Miembros/persona.service';
import { Persona } from 'src/app/Modulos/Modelos/persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  persona = new Persona();
  personas = null;
  det = null;
  
  constructor(private personaService: PersonaService, private router: RouterModule) { }

  ngOnInit(): void
  {
    this.validar();
  }

  validar() {
    (function () {
      'use strict'
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  validarCampos()
  {
    if ((this.persona.correo != null && this.persona.correo != '') && (this.persona.clave != null && this.persona.clave != '') && (this.det != null && this.det != ''))
    {
      return true;
    }
    else
    {
      return false;
    }
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

  cambiarClave()
  {
    if (this.validarCampos() == true)
    {
      if (this.validarClaves() == true)
      {
        this.personaService.cambiarClave(this.persona).subscribe
          (
            datos => {
              if (datos['respuesta'] == 1)
              {
                Swal.fire
                ({
                  title: '',
                  text: 'CONTRASEÑA CAMBIADA',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
                  .then(resultado => {
                    const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
                    window.location.replace(redirect);
                })
              }
              else if (datos['respuesta'] == 3)
              {
                Swal.fire
                ({
                  title: '',
                  text: 'CONTRASEÑA REGISTRADA PREVIAMENTE',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
              }
              else
              {
                Swal.fire
                ({
                  title: '',
                  text: 'CORREO NO REGISTRADO',
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
    else
    {
      Swal.fire
      ({
        title: '',
        text: 'DEBE LLENAR LOS CAMPOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }
}
