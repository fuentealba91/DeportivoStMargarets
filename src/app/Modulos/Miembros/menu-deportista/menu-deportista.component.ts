import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-menu-deportista',
  templateUrl: './menu-deportista.component.html',
  styleUrls: ['./menu-deportista.component.css']
})
export class MenuDeportistaComponent implements OnInit {

  loginForm!: FormGroup;
  deportes = null;
  categorias = null;
  persona = null;
  deportesActivos:any[] = [];
  categoriasActivas:any[] = [];
  date: Date = new Date();


  constructor(private formBuilder: FormBuilder, private personaService: PersonaService, private deporteService: DeporteService, private categoriaService: CategoriaService) 
  {
    this.loginForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.required),
      genero: new FormControl('',Validators.required),
      edad: new FormControl('',Validators.required),
      cupo: new FormControl('',Validators.required),
      deporte: new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
    this.listarDeportes();
    this.listarPerfil();
    console.log(this.date);
    console.log(this.date.getTime());
  }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => {this.persona = datos
        console.log(datos);
        var fecha = new Date(this.persona![0][12])
        fecha.setDate(fecha.getDate() + 1);
        console.log(fecha);
        var años = Math.abs(this.date.getFullYear() - fecha.getFullYear());
        // años = ((años/1000)/3600)/24;
        console.log(años);
        }
      );
    
  }

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => {this.deportes = datos;
        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].estado == 1)
          {
            this.deportesActivos.push(datos[i]);
            // console.log(datos[i]);
          }
        }
      }
    );
  }

  listarCategoriaPorDeporte(id)
  {
    this.categoriaService.listarCategoriaPorDeporte(id).subscribe
    (
      (datos:any) => {this.categorias = datos;
        this.categoriasActivas = [];
        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].estado == 1)
          {
            this.categoriasActivas.push(datos[i]);
            console.log(datos[i]);
          }
        }
      }
    );
  }
}
