import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import {MessageService} from 'primeng/api';
import { LoginResquest } from '../../models/login/LoginResquest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

   // Form
   formGroup = new FormGroup ({
    email: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.email
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
  });

  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password'); }

  constructor(
    private loginService:LoginService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {

  }

  onSbmitLogin(){
    this.loading = true;
    const request: LoginResquest =  new LoginResquest();
    request.email = this.email?.value;
    request.password = this.password?.value;
    request.app = 'APP_BCK';
    this.loginService.login2(request).subscribe(data => {
      this.messageService.add({severity:'success', summary:'Exito', detail: 'Bienvenido al mantenedor Tuten'});

      console.log(data);
      this.loginService.setUsuario(data);
      localStorage.setItem('session', JSON.stringify(data));
      this.router.navigate(['home']);
      this.loading = false;
      this.router.navigate(['/']);

    },
    err => {
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error', detail: 'Error al iniciar sesion, intente mas tarde'});
      this.router.navigate(['/login']);
    });
  }

}
