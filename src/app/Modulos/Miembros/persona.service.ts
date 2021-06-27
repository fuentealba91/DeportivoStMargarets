import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaService 
{
  redirectUrl!: string;
  
  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarPersona()
  {
    return this.http.get(`${this.url}listarPersona.php`);
  }

  detallePersona(iden: number)
  {
    return this.http.get(`${this.url}detallePersona.php?id=${iden}`);
  }

  agregarPersona(persona: any)
  {
    return this.http.post(`${this.url}agregarPersona.php`, JSON.stringify(persona));
  }

  eliminarPersona(iden: number)
  {
    return this.http.get(`${this.url}eliminarPersona.php?id=${iden}`);
  }
  
  crearCuenta(modificado)
  {
    console.log(modificado);
    return this.http.post(`${this.url}crearCuenta.php`, JSON.stringify(modificado));
  }

  iniciarSesion(persona: any)
  {
    return this.http.post(`${this.url}iniciarSesion.php`, JSON.stringify(persona));
  }

  cambiarClave(persona)
  {
    return this.http.post(`${this.url}cambiarClave.php`, JSON.stringify(persona));
  }

  editarPersona(ide:string, rut:string, nom:string, pat:string, mat:string, cor:string, tel:string, eme:string, nac:any, com:string, dir:string, sex:string)
  {
    var persona = 
    {
      id: ide,
      rut: rut,
      nombre: nom,
      aPaterno: pat,
      aMaterno: mat,
      correo: cor,
      telefono: tel,
      tEmergencia: eme,
      fNacimiento: nac,
      comuna: com,
      direccion: dir,
      sexo: sex
    }

    return this.http.post(`${this.url}editarPersona.php`, JSON.stringify(persona));
  }
}
