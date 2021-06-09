import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearEmpleadoRequest } from 'src/app/models/empleado/CrearEmpleadoRequest';
import { CrearEmpleadoResponse } from 'src/app/models/empleado/CrearEmpleadoResponse';
import { DeleteEmpleadoResponse } from 'src/app/models/empleado/DeleteEmpleadoResponse';
import { GetAllEmpleadoResponse } from 'src/app/models/empleado/GetAllEmpleadoResponse';
import { GetIdEmpleadoResponse } from 'src/app/models/empleado/GetIdEmpleadoResponse';
import { UpdateEmpleadoRequest } from 'src/app/models/empleado/UpdateEmpleadoRequest';
import { UpdateEmpleadoResponse } from 'src/app/models/empleado/UpdateEmpleadoResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  URL = environment.apiEmpleado;
  private crearE = '/empleado/create';
  private deleteE = '/empleado/delete/';
  private getAllE = '/empleado/get/all';
  private getIdE = '/empleado/get/id';
  private updateE = '/empleado/update';

  constructor(
    private httpClient: HttpClient
  ) { }


  crear(request: CrearEmpleadoRequest): Observable<CrearEmpleadoResponse>{
    return this.httpClient.post<CrearEmpleadoResponse>(this.URL + this.crearE, request);
  }

  getAll(): Observable<GetAllEmpleadoResponse>{
    return this.httpClient.get<GetAllEmpleadoResponse>(this.URL + this.getAllE);
  }

  findById(id: string): Observable<GetIdEmpleadoResponse>{
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get<GetIdEmpleadoResponse>(this.URL + this.getIdE, {params});
  }

  update(request: UpdateEmpleadoRequest): Observable<UpdateEmpleadoResponse>{
    return this.httpClient.put<UpdateEmpleadoResponse>(this.URL + this.updateE, request);
  }

  delete(id: string): Observable<DeleteEmpleadoResponse>{
    return this.httpClient.delete<DeleteEmpleadoResponse>(this.URL + this.deleteE + id);
  }
}
