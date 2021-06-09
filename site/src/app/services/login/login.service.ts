import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResquest } from 'src/app/models/login/LoginResquest';
import { BookingResponsable } from 'src/app/models/booking/BookingResponsable';
import { BookingResquest } from 'src/app/models/booking/BookingResquest';
import { LoginResponse } from 'src/app/models/login/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLogin = new BehaviorSubject<boolean>(false);
  private dataUser: LoginResponse = new LoginResponse();

  URL = environment.apiEmpleado;
  private endpoint = '/empleado/login';
  private endpointb = '/empleado/booking';

  constructor(
    private httpClient: HttpClient
  ) { }

  get getisLogin(): Observable<boolean> {
    return this.isLogin;
  }
  getUsuario() {
    if(!this.dataUser.loggedIn)  {
      let item = localStorage.getItem('session');
      console.log('item: ', item);
      if(item) {
        this.dataUser = JSON.parse(item);
      }
    }
    return this.dataUser;
  }
  setUsuario(usuario: LoginResponse) {
    this.dataUser = usuario;
    this.dataUser.loggedIn = true;
    this.isLogin.next(true);
  }

  hasUser() {
    this.dataUser = this.getUsuario();
    return this.dataUser.loggedIn;
  }

  logout() {
    localStorage.removeItem('session');
    this.dataUser = new LoginResponse();
  }


  login2(request: LoginResquest): Observable<LoginResponse>{
    const resp = this.httpClient.post<LoginResponse>(this.URL + this.endpoint, request);
    return this.httpClient.post<LoginResponse>(this.URL + this.endpoint, request);
  }

  getBooking(request: BookingResquest): Observable<BookingResponsable>{
    return this.httpClient.post<BookingResponsable>(this.URL + this.endpointb, request);
  }

}
