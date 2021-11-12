import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonaReunion } from '../../Modelos/persona-reunion';
import { Reunion } from '../../Modelos/reunion';
import { PersonaService } from '../persona.service';
import { ReunionService } from '../reunion.service';
import { RolService } from '../rol.service';
import { TipoReunionService } from '../tipo-reunion.service';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {

  reunion = new Reunion();
  reuniones = null;
  personas = null;
  tipos: any[] = [];
  det = null;
  loginForm!: FormGroup;
  resultadoForm!: FormGroup;
  persona = null;
  submitted:boolean = false;
  date: Date = new Date();
  flag:boolean = false;
  asociados:any[] = [];
  invitacion = new PersonaReunion();
  reunionMayor = 0;
  confirmados:any[] = [];

  constructor(
    private personaService: PersonaService, 
    private tipoService: TipoReunionService, 
    private reunionService: ReunionService,
    private router: Router,
    private rolService: RolService,
    private formBuilder: FormBuilder) 
    {
      this.loginForm = this.formBuilder.group({
        fecha: new FormControl('',Validators.required),
        lugar: new FormControl('',Validators.required),
        puntos: new FormControl('',Validators.required),
        encargado: new FormControl('',Validators.required),
        tipo: new FormControl('',Validators.required)
      })
      this.resultadoForm = this.formBuilder.group({
        reunion: new FormControl('',Validators.required),
        fecha: new FormControl('',Validators.required),
        puntos: new FormControl('',Validators.required),
        acuerdo: new FormControl('',Validators.required),
      })
    }

  ngOnInit(): void {
    this.listarPersona();
    this.listarTipoReuniones();
    this.listarReuniones();
  }

  listarInvitadosConfirmados(id)
  {
    this.reunionService.listarInvitadosConfirmados(id).subscribe(
      (datos:any) => 
      {
        console.log("DATOS ",datos);
        for(let i=0; i<datos.length; i++)
        {
          if(datos[i].asistio != 2 && datos[i].asistio != 0)
          {
            this.confirmados.push(datos[i]);
          }
        }
      }
    )
  }

  listarMiembrosAsociados()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if((datos[i].id_rol == 1) || (datos[i].id_rol == 2))
            {
              this.asociados.push(datos[i]);
            }
          }

          this.invitarReunion();
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'NO EXISTEN MIEMBROS A INVITAR',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          }).then(resultado => {
            this.listarReuniones();
            location.reload();
          })
        }
      }
    )
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos
      }
    );
  }

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => this.personas = datos
    );
  }

  listarTipoReuniones()
  {
    this.tipoService.listarTipoReunion().subscribe
    (
      (datos:any) => {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado != 0)
            {
              this.tipos.push(datos[i]);
            }
          }
        }
      }
    );
  }

  listarReuniones()
  {
    this.reunionService.listarReunion().subscribe
    (
      (datos: any) => 
      {
        if(datos)
        {
          this.reuniones = datos
          let numero = 0;
          for(let i=0;i<datos.length;i++)
          {
            if(Number(datos[i].idReunion) > numero)
            {
              this.reunionMayor = datos[i].idReunion;
              numero = datos[i].idReunion;
            }
          }
        }
      }
    );
  }

  detalleReunionId(iden)
  {
    this.reunionService.detalleReunion(iden).subscribe
    (
      (datos:any) => 
      {
        this.det = datos
        this.resultadoForm.controls['reunion'].setValue(datos[0].descripcion);
        this.resultadoForm.controls['fecha'].setValue(datos[0].fecha);
        this.resultadoForm.controls['puntos'].setValue(datos[0].puntosTratar);
        this.resultadoForm.controls['acuerdo'].setValue(datos[0].acuerdos);
      }
    );
  }

  agendarReunion() 
  {
    this.submitted = true;

    if(this.loginForm.invalid)
    {
      return;
    }
    else
    {
      if(this.loginForm.status != 'INVALID')
      {
        let fecha = new Date(this.loginForm.value.fecha);

        if(this.date < fecha)
        {
          this.flag = false;
          this.reunion.fecha = this.loginForm.value.fecha;
          this.reunion.lugar = this.loginForm.value.lugar;
          this.reunion.puntos = this.loginForm.value.puntos;
          this.reunion.encargado = this.loginForm.value.encargado;
          this.reunion.tipo = this.loginForm.value.tipo;

          this.reunionService.agendarReunion(this.reunion).subscribe
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
                    this.listarReuniones();
                    // this.listarMiembrosAsociados();
                  })
                  .then(resultado => {
                    setTimeout(() => {
                      this.listarMiembrosAsociados();
                    }, 100);
                    
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
          )
        }
        else
        {
          this.flag = true;
          console.log(this.flag);
        }
      }
    }
  }

  eliminarReunion(id)
  {
    this.reunionService.eliminarReunion(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'REUNIÓN ELIMINADA',
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
            text: 'REUNIÓN NO ELIMINADA',
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

  agregarAcuerdos()
  {
    this.submitted = true;

    if(this.resultadoForm.invalid)
    {
      return;
    }
    else
    {
      if(this.resultadoForm.status != 'INVALID')
      {
        let acuerdo = new Reunion();
        acuerdo.id = this.det![0][0];
        acuerdo.acuerdos = this.resultadoForm.value.acuerdo;

        this.reunionService.agregarAcuerdos(acuerdo).subscribe
        (
          datos =>
          {
            if (datos['resultado'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'ACUERDOS AGREGADOS',
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
                text: 'ACUERDOS NO AGREGADOS',
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

  invitarReunion()
  {
    let result = 0;

    for(let i = 0; i<this.asociados.length; i++)
    {
      this.invitacion.idPersona = this.asociados[i].id_persona;
      this.invitacion.idReunion = this.reunionMayor;

      this.reunionService.invitarReunion(this.invitacion).subscribe(
        datos => 
        {
          if(datos['respuesta'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'INVITACIONES ENVIADAS',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            }).then(resultado => {
              this.listarReuniones();
              location.reload();
            })
          }
          else
          {
            Swal.fire
            ({
              title: '',
              text: 'INVITACIONES NO ENVIADAS',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            }).then(resultado => {
              this.listarReuniones();
              location.reload();
            })
          }
        }
      )
    }
    return result;
  }

  confirmarAsistencia(invitacion)
  {
    console.log(invitacion);
    this.invitacion.id = invitacion.id;
    this.invitacion.idPersona = invitacion.persona;
    this.invitacion.idReunion = invitacion.reunion;
    this.invitacion.asistio = 3;

    this.reunionService.modificarInvitacion(this.invitacion).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA REGISTRADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarInvitadosConfirmados(invitacion.reunion);
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA NO REGISTRADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarInvitadosConfirmados(invitacion.reunion);
          })
        }
      }
    );
  }

  rechazarAsistencia(invitacion)
  {
    this.invitacion.id = invitacion.id;
    this.invitacion.idPersona = invitacion.persona;
    this.invitacion.idReunion = invitacion.reunion;
    this.invitacion.asistio = 4;

    this.reunionService.modificarInvitacion(this.invitacion).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA REGISTRADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarInvitadosConfirmados(invitacion.reunion);
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA NO REGISTRADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarInvitadosConfirmados(invitacion.reunion);
          })
        }
      }
    );
  }
}
