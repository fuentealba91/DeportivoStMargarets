import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonaService } from '../../Miembros/persona.service';
import { Persona } from '../../Modelos/persona';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  persona = new Persona();

  constructor(private personaService: PersonaService, private router: Router) { }

  ngOnInit(): void 
  {
    this.validar();
  }
  
  validar()
  {
    (function () 
    {
      'use strict'
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) 
        {
          form.addEventListener('submit', function (event) 
          {
            if (!form.checkValidity()) 
            {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  Ingresar()
  {
    if (((this.persona.correo != null)&&(this.persona.correo != '')) && ((this.persona.clave != null)&&(this.persona.clave != '')))
    {
      this.personaService.iniciarSesion(this.persona).subscribe
      (
        datos =>
        {
          const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
          this.router.navigate([redirect]);
        },
        error =>
        Swal.fire
        ({
          title: '',
          text: 'CORREO Y/O CONTRASEÑA INCORRECTOS',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          showConfirmButton: true
        })
      );
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
