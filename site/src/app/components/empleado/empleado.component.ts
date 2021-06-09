import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { CrearEmpleadoRequest } from 'src/app/models/empleado/CrearEmpleadoRequest';
import { UpdateEmpleadoRequest } from 'src/app/models/empleado/UpdateEmpleadoRequest';
import { LoginService } from 'src/app/services/login/login.service';
import { EmpleadoDto } from '../../models/empleado/EmpleadoDto';
import { EmpleadoService } from '../../services/empleado/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class EmpleadoComponent implements OnInit {

  empleados!: EmpleadoDto[];
  selectedEmpleados!: EmpleadoDto[];
  loading: boolean = true;
  newEdit: boolean = false;
  tituloForm: string = '';
  flujoActual: string =  '';

  @ViewChild('dt') table!: Table;

   // Form
   formGroup = new FormGroup ({
    id: new FormControl("", [
      // Validators.required,
      // Validators.minLength(9),
      // Validators.maxLength(15)
    ]),
    rut: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      // Validators.maxLength(15)
    ]),
    nombre: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      // Validators.maxLength(20)
    ]),
    apaterno: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      // Validators.maxLength(20)
    ]),
    amaterno: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      // Validators.maxLength(20)
    ]),
    correo: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      // Validators.maxLength(20),
      Validators.email
    ]),
    fechaIncorporacion: new FormControl("", [
      // Validators.required,
    ]),
  });
  get id() { return this.formGroup.get('id'); }
  get rut() { return this.formGroup.get('rut'); }
  get nombre() { return this.formGroup.get('nombre'); }
  get apaterno() { return this.formGroup.get('apaterno'); }
  get amaterno() { return this.formGroup.get('amaterno'); }
  get correo() { return this.formGroup.get('correo'); }
  get fechaIncorporacion() { return this.formGroup.get('fechaIncorporacion'); }

  constructor(
    private primengConfig: PrimeNGConfig,
    private empleado: EmpleadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private login: LoginService
  ) { }

  ngOnInit(): void {
    this.login.getisLogin.subscribe(u =>{
      console.log('u: ',u);
    });
    this.primengConfig.ripple = true;
    this.getAll();
  }

  getAll(){
    this.empleado.getAll().subscribe(data => {
      console.log(data);
      if (data && data.mensajeriaOp && data.mensajeriaOp.cod == '200') {
        this.empleados = data.empleadoList;
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail: data.mensajeriaOp.msj});
      }
      this.loading = false;
    },
    err => {
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error', detail: 'Error al Obtener empleados, intente mas tarde'});
    });
  }

  eliminar(e:EmpleadoDto){
    this.confirmationService.confirm({
      message: 'Seguro que desea eliminar el empleado',
      header: 'Confirmar eliminacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.empleado.delete(e.id.toString()).subscribe(data => {
          console.log(data);
          if (data && data.mensajeriaOp && data.mensajeriaOp.cod == '200') {
            this.getAll();
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'se ha eliminado el empleado: '+ e.id});
          } else {
            this.messageService.add({severity:'error', summary:'Error', detail: data.mensajeriaOp.msj});
          }
          this.loading = false;
        },
        err => {
          console.log(err);
          this.messageService.add({severity:'error', summary:'Error', detail: 'error al eliminar empleado, intente mas tarde'});
        });
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Rejected', detail:'Eliminacion rechazada'});
      }
    });

  }

  showForm(flujo: string, empleado: any){
    this.flujoActual = flujo;
    if ('agregar' ==flujo) {
      this.tituloForm = 'Agregar Nuevo Empleado'
    } else if ('editar' ==flujo){
      this.tituloForm = 'Editar Empleado'
      this.actualizarEmpleado(empleado);
    }
    this.newEdit = true;
  }

  actualizarEmpleado(empleado: EmpleadoDto) {
    this.formGroup.setValue({
      id: empleado.id || null,
      rut: empleado.rut || null,
      nombre: empleado.nombre  || null,
      apaterno: empleado.apellidoPaterno  || null,
      amaterno: empleado.apellidoMaterno  || null,
      correo: empleado.correo  || null,
      fechaIncorporacion: empleado.fechaIncorporacion  || null
    });
  }

  getEmpleado() {
    const empleado: EmpleadoDto = new EmpleadoDto();
    empleado.id = this.formGroup.value.id;
    empleado.rut = this.formGroup.value.rut;
    empleado.nombre = this.formGroup.value.nombre;
    empleado.apellidoPaterno = this.formGroup.value.apaterno;
    empleado.apellidoMaterno = this.formGroup.value.amaterno;
    empleado.correo = this.formGroup.value.correo;
    empleado.fechaIncorporacion= this.formGroup.value.fechaIncorporacion;
    return empleado;
  }

  guardar(){
    console.log('this.flujoActual ',this.flujoActual);
    if (this.flujoActual =='agregar') {
      this.confirmationService.confirm({
        message: 'Seguro que desea crear el empleado',
        header: 'Confirmar creacion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.crear();
        },
        reject: () => {
          this.messageService.add({severity:'info', summary:'Rejected', detail:'Creacion rechazada'});
        }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Seguro que desea actualizar el empleado',
        header: 'Confirmar actualizacion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.update();
        },
        reject: () => {
          this.messageService.add({severity:'info', summary:'Rejected', detail:'actualizacion rechazada'});
        }
      });
    }
  }

  crear(){
    const request: CrearEmpleadoRequest = new CrearEmpleadoRequest();
    request.empleadoDto = this.getEmpleado();
    this.empleado.crear(request).subscribe(data => {
      console.log(data);
      if (data && data.mensajeriaOp && data.mensajeriaOp.cod == '200') {
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'se ha registrado el empleado: '+ data.empleadoDto.id});
        this.getAll();
        this.cancelar();
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail: data.mensajeriaOp.msj});
      }
      this.loading = false;
    },
    err => {
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error', detail: 'Error al crear empleado, intente mas tarde'});
    });
  }

  update(){
    const request: UpdateEmpleadoRequest = new UpdateEmpleadoRequest();
    request.empleadoDto = this.getEmpleado();
    this.empleado.update(request).subscribe(data => {
      console.log(data);
      if (data && data.mensajeriaOp && data.mensajeriaOp.cod == '200') {
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'se ha actualizado el empleado: '+ data.empleadoDto.id});
        this.getAll();
        this.cancelar();
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail: data.mensajeriaOp.msj});
      }
      this.loading = false;
    },
    err => {
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error', detail: 'Error al actualizar empleado, intente mas tarde'});
    });
  }

  cancelar(){
    this.formGroup.reset();
    this.newEdit = false;
  }

}
