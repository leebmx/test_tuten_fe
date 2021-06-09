import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoginResponse } from '../../models/login/LoginResponse';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class NavbarComponent implements OnInit {
  public isLogin!: boolean;
  public nombreUsuario!: string;
  public emailUsuario!: string;

  constructor(
    private login: LoginService,
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
    this.login.getisLogin.subscribe(u =>{
      this.isLogin = u;
    });
    this.isLogin = this.login.hasUser();
    console.log('NavbarComponent - Esta Logueado: ', this.isLogin);

    const user: LoginResponse = this.login.getUsuario();

    this.emailUsuario = user.firstName;
  }


  logout() {
    this.confirmationService.confirm({
      message: 'Seguro que desea salir del mantenedor',
      header: 'Confirmar logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.login.logout();
        this.router.navigate(['/login']);
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Rejected', detail:'logout rechazado'});
      }
    });

  }

}
