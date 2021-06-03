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
}
