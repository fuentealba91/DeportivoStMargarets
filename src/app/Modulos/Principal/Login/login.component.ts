import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
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
  loginForm!: FormGroup;
  submitted:boolean = false;
  sitekey: string;

  constructor(private personaService: PersonaService, private router: Router,private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]),
      recaptcha: new FormControl(['', Validators.required])
    })
    this.sitekey = '6LdItKkbAAAAANzToTmqvTG0eNbHKQC00ZYUVQh2';
  }

  ngOnInit(): void 
  {
    
  }


  Ingresar()
  {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else 
    {
      if(this.loginForm.status != 'INVALID')
      {
        this.persona.correo = (<HTMLInputElement>document.getElementById("correo")).value;
        this.persona.clave = (<HTMLInputElement>document.getElementById("clave")).value;
        
        this.personaService.iniciarSesion(this.persona).subscribe
          (
            datos => {
              sessionStorage.setItem("id", datos[0][0]);
              console.log(sessionStorage.getItem("id"));
              const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
              this.router.navigate([redirect]);
            }
          //   error =>
          //     Swal.fire
          //       ({
          //         title: '',
          //         text: 'CORREO Y/O CONTRASEÑA INCORRECTOS',
          //         icon: 'error',
          //         confirmButtonText: 'Aceptar',
          //         showConfirmButton: true
          //       })
          );
      }
    }
    
  }

}
