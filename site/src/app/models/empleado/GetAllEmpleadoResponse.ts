import { EmpleadoDto } from "./EmpleadoDto";
import { MensajeriaOp } from "./MensajeriaOp";

export class GetAllEmpleadoResponse {
  mensajeriaOp!: MensajeriaOp;
  empleadoList!: EmpleadoDto[];
}
