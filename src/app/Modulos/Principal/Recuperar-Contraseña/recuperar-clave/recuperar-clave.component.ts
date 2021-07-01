import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
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
  det: any;
  loginForm!: FormGroup
  
  constructor(private personaService: PersonaService, private router: RouterModule, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
      password: new FormControl('',Validators.required),
      confirm_password: new FormControl('',Validators.required),
    });
   }

  ngOnInit(): void
  {

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
    if (this.loginForm.status != 'INVALID')
    {
      this.persona.correo = (<HTMLInputElement>document.getElementById("correo")).value;
      this.persona.clave = (<HTMLInputElement>document.getElementById("clave")).value;
      this.det = (<HTMLInputElement>document.getElementById("confirme")).value;

      if (this.validarClaves())
      {
        this.personaService.cambiarClave(this.persona).subscribe
        (datos => {
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
        })
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
