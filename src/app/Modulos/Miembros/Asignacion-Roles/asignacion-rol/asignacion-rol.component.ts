import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/Modulos/Modelos/persona';
import { RolPersona } from 'src/app/Modulos/Modelos/rol-persona';
import Swal from 'sweetalert2';
import { PersonaService } from '../../persona.service';
import { RolService } from '../../rol.service';

@Component({
  selector: 'app-asignacion-rol',
  templateUrl: './asignacion-rol.component.html',
  styleUrls: ['./asignacion-rol.component.css']
})
export class AsignacionRolComponent implements OnInit {

  personas = null;
  roles = null;
  asignado = null;
  asignar = new RolPersona();

  constructor(private personaService: PersonaService, private rolService: RolService) { }

  ngOnInit(): void {
    this.listarPersona();
    this.listarRoles();
    this.listarRolesAsignados();
  }

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => this.personas = datos
    );
  }

  listarRoles()
  {
    this.rolService.listarRoles().subscribe
    (
      (datos:any) => this.roles = datos
    );
  }

  listarRolesAsignados()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => this.asignado = datos
    )
  }

  asignarRol()
  {
    if ((this.asignar.idPersona != null && this.asignar.idPersona != 0)&&(this.asignar.idRol != null && this.asignar.idRol != 0))
    {
      this.rolService.asignarRol(this.asignar).subscribe
        (
          datos =>
          {
            if (datos['respuesta'] == 1)
            {
              Swal.fire
                ({
                  title: '',
                  text: 'ROL ASIGNADO',
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
                  text: 'ROL YA ASIGNADO',
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
        text: 'TODOS LOS CAMPOS DEBEN SER LLENADOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }
}
