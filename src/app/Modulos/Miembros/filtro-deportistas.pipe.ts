import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDeportistas'
})
export class FiltroDeportistasPipe implements PipeTransform {

  transform(value: any, arg: any): any
  {
    const resultado: string[] = [];

    if(arg === "")
    {
      return value;
    }

    for(const campos of value)
    {
      if(campos.idDeporte.indexOf(arg) > -1)
      {
        resultado.push(campos);
      }
    }
    return resultado;
    // console.log(value);
    // console.log(arg);

    // if(arg.nombre==="")
    // {
    //   if(arg.deporte==="")
    //   {
    //     if(arg.categoria==="")
    //     {
    //       if(arg.estado==="")
    //       {
    //         return value;
    //       }
    //     }
    //   }
    // }

    // for(const campos of value)
    // {
    //   if(campos.nombrePersona.toUpperCase().indexOf(arg.nombre.toUpperCase()) > -1 || campos.paterno.toUpperCase().indexOf(arg.nombrePersona.toUpperCase()) > -1)
    //   if(campos.idDeporte.indexOf(arg.deporte) > -1)
    //   {
    //     if(campos.idCategoria.indexOf(arg.categoria) > -1)
    //     {
    //       if(campos.estado.indexOf(arg.estado) > -1)
    //       {
    //         resultado.push(campos);
    //       }
    //     }
    //   }
    // }
    // return resultado;
  }
}
