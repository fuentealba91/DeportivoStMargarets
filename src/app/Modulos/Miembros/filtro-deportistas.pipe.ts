import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDeportistas'
})
export class FiltroDeportistasPipe implements PipeTransform {

  transform(value: any, args: any): any 
  {
    const resultado: any[] = [];
    return value;
    
    for(const campos of value)
    {
      if(campos.nombre.indexOf(args.nombre) > -1)
      {
        resultado.push(campos);
      }
      // if(campos.deporte.indexOf(args.deporte) > -1)
      // {
      //   if(campos.categoria.indexOf(args.categoria) > -1)
      //   {
      //     if(campos.estado.indexOf(args.estado) > -1)
      //     {
      //       resultado.push(campos);
      //     }
      //   }
      // }
    }
    return resultado;
  }
}
