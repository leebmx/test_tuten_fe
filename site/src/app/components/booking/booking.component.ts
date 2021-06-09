import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { BookingsDto } from '../../models/booking/BookingsDto';
import { LoginService } from '../../services/login/login.service';
import { BookingResquest } from '../../models/booking/BookingResquest';
import { LoginResponse } from '../../models/login/LoginResponse';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [MessageService]
})
export class BookingsComponent implements OnInit {
  booking!: BookingsDto[];
  selectedBooking!: BookingsDto[];
  loading: boolean = true;

  @ViewChild('dt') table!: Table;



  constructor(
    private primengConfig: PrimeNGConfig,
    private bookingService: LoginService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

    this.primengConfig.ripple = true;

    this.getBooking();
  }

  getBooking(){
    const request: BookingResquest =  new BookingResquest();
    const user: LoginResponse = this.bookingService.getUsuario();
    request.email = 'contacto@tuten.cl';
    request.app = 'APP_BCK';
    request.token = user.sessionTokenBck;
    request.current = true;
    request.adminemail = user.email;
    this.bookingService.getBooking(request).subscribe(data => {

      console.log(data);
      this.booking = data.list;
      this.loading = false;

    },
    err => {
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error', detail: 'Error al iniciar sesion, intente mas tarde'});
    });
  }

}
