import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolPersona } from '../../Modelos/rol-persona';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-menu-socios',
  templateUrl: './menu-socios.component.html',
  styleUrls: ['./menu-socios.component.css']
})
export class MenuSociosComponent implements OnInit {

  persona = null;
  loginForm!: FormGroup;
  submitted:boolean = false;
  rolPersona = new RolPersona;
  personaRol: any[] = [];

  constructor(private router: Router, private rolService: RolService, private personaService: PersonaService, private formBuilder: FormBuilder) 
  {
    this.loginForm = this.formBuilder.group({
      profesion: new FormControl('',Validators.required),
      relacion: new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
    this.listarPerfil();
    this.listarDetalleSocio();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => {this.persona = datos}
      );
  }

  listarDetalleSocio()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.rolService.listarRolAsignado().subscribe
      (
        (datos: any) => 
        {
          if(datos)
          {
            for(let i=0;i<datos.length;i++)
            {
              if(datos[i].id_persona = id && (datos[i].id_rol == 2 || datos[i].id_rol == 3))
              {
                this.personaRol.push(datos[i]);
              }
            }
          }
          console.log(this.personaRol);
        }
      );
  }

  eliminarSocio()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');

    this.rolService.eliminarRolAsignado(id,this.personaRol[0].id_rol).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'SOCIO DESINSCRITO',
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
            text: 'SOCIO NO DESINSCRITO',
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

  registrarSocio() {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else
    {
      if (this.loginForm.status != 'INVALID')
      {
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');
        this.rolPersona.idPersona = id;
        this.rolPersona.profesion = this.loginForm.value.profesion;
        this.rolPersona.idRol = this.loginForm.value.relacion;
        console.log(this.rolPersona);
        this.rolService.asignarRol(this.rolPersona).subscribe
        (
          datos =>
          {
            if (datos['respuesta'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'SOLICITUD ENVIADA',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
              .then(resultado => {
                location.reload();
              })
            }
            else if (datos['respuesta'] == 2)
            {
              Swal.fire
              ({
                title: '',
                text: 'EL ROL YA SE ENCUENTRA ASOCIADO',
                icon: 'error',
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
              .then(resultado =>
              {
                location.reload();
              })
            }
          }
        )
      }
    }
  }
}
