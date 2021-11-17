import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Galeria } from '../../Modelos/galeria';
import { Fotos} from '../../Modelos/fotos'
import { MultimediaService } from '../multimedia.service';
import { FotosService } from '../fotos.service';

@Component({
  selector: 'app-galerias',
  templateUrl: './galerias.component.html',
  styleUrls: ['./galerias.component.css']
})
export class GaleriasComponent implements OnInit {

  galeria = new Galeria();
  galerias :any[]= [];
  foto = new Fotos();
  fotos: any[]=[];
  det = null;

  constructor(private multimediaService: MultimediaService, private router: Router, private fotosService: FotosService) { }

  ngOnInit(): void {

    console.log(this.fotos);
    this.listarGalerias();
    this.listarFotos();
  }

  listarGalerias()
  {
    this.multimediaService.listarGalerias().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0; i<datos.length;i++)
          {
            this.galerias.push(datos[i]);
          }
        }
      }
    );
  }

  listarFotos()
  {

    this.fotosService.listarFotos().subscribe
    (
      (datos:any) => 
      {
        console.log(datos);
        
        let idGaleria = 0;
        if(datos)
        {
          for(let i=0; i<datos.length;i++)
          {
            if(this.fotos.length > 0)
            {
              for(let j=0; j<this.fotos.length; j++)
              {
                if(datos[i].idGaleria != this.fotos[j].idGaleria)
                {
                  this.fotos.push(datos[i]);
                }
              }
            }
              if(datos[i].idGaleria != idGaleria)
              {
                this.fotos.push(datos[i]);
                idGaleria = datos[i].idGaleria;
              }
          }
        }
      }
    );
  }

  listarFotoGaleriaId(iden)
  {
    this.multimediaService.listarFotoGaleria(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

}
