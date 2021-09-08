import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  redirectUrl!: string;
  
  url = 'http://localhost:80/PHP_BDD/';

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  listarPersona() {
    return this.http.get(`${this.url}listarPersona.php`);
  }

  detallePersona(iden: number) {
    return this.http.get(`${this.url}detallePersona.php?id=${iden}`);
  }

  agregarPersona(persona: any) {
    return this.http.post(`${this.url}agregarPersona.php`, JSON.stringify(persona));
  }

  eliminarPersona(iden: number) {
    return this.http.get(`${this.url}eliminarPersona.php?id=${iden}`);
  }
  
  crearCuenta(modificado) {
    console.log(modificado);
    return this.http.post(`${this.url}crearCuenta.php`, JSON.stringify(modificado));
  }

  iniciarSesion(persona: any) {
    console.log(JSON.stringify(persona));
    return this.http.post(`${this.url}iniciarSesion.php`, JSON.stringify(persona))
      .pipe(map(Users => {
        this.setToken(Users[0].name);
        this.getLoggedInName.emit(true);
        return Users;
      }));
  }

  validarRespuesta(persona)
  {
    return this.http.post(`${this.url}validarRespuesta.php`, JSON.stringify(persona));
  }

  cambiarClave(persona)
  {
    return this.http.post(`${this.url}cambiarClave.php`, JSON.stringify(persona));
  }

  editarPersona(persona)
  {
    return this.http.post(`${this.url}editarPersona.php`, JSON.stringify(persona));
  }

  setToken(token: string) 
  {
    localStorage.setItem('token', token);
  }

  getToken() 
  {
    return localStorage.getItem('token');
  }

  deleteToken() 
  {
    localStorage.removeItem('token');
  }

  isLoggedIn() 
  {
    const usertoken = this.getToken();
    if (usertoken != null) 
    {
      return true;
    }
    return false;
  }
}
