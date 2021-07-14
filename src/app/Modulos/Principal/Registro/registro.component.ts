import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
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
  loginForm!: FormGroup;

  constructor(private personaService: PersonaService, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      rut: new FormControl('',[Validators.required, Validators.pattern("[0-9]{8,}")]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
        password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]),
      confirm_password: new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
  }


  crearCuenta()
  {
    if(this.loginForm.status != 'INVALID')
    {
      this.persona.rut = ((<HTMLInputElement>document.getElementById("rut")).value);
      this.persona.correo = (<HTMLInputElement>document.getElementById("correo")).value;
      this.persona.clave = (<HTMLInputElement>document.getElementById("clave")).value;
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
              const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
              window.location.replace(redirect);
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
        text: 'DEBE LLENAR LOS CAMPOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }
}