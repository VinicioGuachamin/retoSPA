import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";
import {IPuesto} from "../interfaces/IPuesto";
import {IEmpleado} from "../interfaces/IEmpleado";
import {IDependiente} from "../interfaces/IDependiente";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  BuscarEmpleadosByCodNombreApellido(codigo: number, nombre: string, apellido: string){
    let Params = new HttpParams();
    Params = Params.append('codigo', codigo);
    Params = Params.append('apellido', apellido);
    Params = Params.append('apellido', apellido);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: Params
    };
    return this.http.get(environment.apiBaseUrl +
      '/api/Empleados', httpOptions);
  }

  ObtenerListaPuestos(){
    return this.http.get(`${environment.apiBaseUrl}/api/Puestos`);
  }

  InsertarEmpleado(empleado: IEmpleado): Observable<IEmpleado> {
    return this.http.post<IEmpleado>(`${environment.apiBaseUrl}/api/Empleados`, empleado);
  }

  ObtenerListaEmpleados(){
    return this.http.get(`${environment.apiBaseUrl}/api/Empleados/ObtenerListaEmpleados`);
  }

  ObtenerEmpleadoPorCodigo(codigo: number): Observable<IEmpleado> {
    return this.http.get<IEmpleado>(`${environment.apiBaseUrl}/api/Empleados/${codigo}`);
  }

  ActualizarEmpleado(codigo: number, empleadoActualizado: IEmpleado): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/api/Empleados/${codigo}`, empleadoActualizado);
  }

  EliminarEmpleado(codigo: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/Empleados/${codigo}`);
  }

  ObtenerListaParentescos(){
    return this.http.get(`${environment.apiBaseUrl}/api/Parentescos`);
  }

  InsertarDependiente(dependiente: IDependiente): Observable<IDependiente> {
    return this.http.post<IDependiente>(`${environment.apiBaseUrl}/api/Dependientes`, dependiente);
  }

  ObtenerListaDependientes(){
    return this.http.get(`${environment.apiBaseUrl}/api/Dependientes`);
  }

  ObtenerDependientesPorEmpleado(codigo: number){
    return this.http.get(`${environment.apiBaseUrl}/api/Empleados/${codigo}/dependientes`);
  }

  BuscarEmpleados(codigo: number, nombre: string, apellido: string): Observable<IEmpleado[]> {
    const params = { codigo: codigo, nombre, apellido };
    return this.http.get<IEmpleado[]>(`${environment.apiBaseUrl}/api/Empleados`, { params });
  }
}
