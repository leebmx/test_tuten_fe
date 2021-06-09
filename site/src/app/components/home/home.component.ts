import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private login: LoginService
  ) { }

  ngOnInit(): void {
    console.log('home - Esta Logueado: ', this.login.hasUser());
  }

}
