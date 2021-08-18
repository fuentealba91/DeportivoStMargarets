import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { Router, RouterLink, RouterModule } from '@angular/router';
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
  submitted: boolean = false;
  sitekey: string;
  
  constructor(private personaService: PersonaService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      preguntaSecreta: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      confirm_password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      recaptcha: new FormControl(['', Validators.required]),
    });

    this.sitekey = '6LdItKkbAAAAANzToTmqvTG0eNbHKQC00ZYUVQh2';
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

  compararClaves()
  {
    if (this.loginForm.value.password != this.loginForm.value.confirm_password)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  cambiarClave()
  {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else {
      if (this.loginForm.status != 'INVALID')
      {
        if (this.compararClaves())
        {
          this.persona.correo = (<HTMLInputElement>document.getElementById("correo")).value;
          this.persona.preguntaSecreta = (<HTMLInputElement>document.getElementById("pregunta")).value;
          console.log(this.persona.preguntaSecreta);
          this.persona.clave = (<HTMLInputElement>document.getElementById("clave")).value;

          this.personaService.cambiarClave(this.persona).subscribe
          (datos => {
            if (datos['respuesta'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'CONTRASEÑA MODIFICADA',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
              .then(resultado =>
              {
                const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
                this.router.navigate([redirect]);
              })
            }
            else if(datos['respuesta'] == 2)
            {
              Swal.fire
              ({
                title: '',
                text: 'EL CORREO NO SE ENCUENTRA REGISTRADO',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
            }
            else if(datos['respuesta'] == 3)
            {
              Swal.fire
              ({
                title: '',
                text: 'LA RESPUESTA NO COINCIDE CON LA REGISTRADA',
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
                text: 'CONTRASEÑA NO MODIFICADA',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
            }
          })
        }
      }
    }
  }
}
