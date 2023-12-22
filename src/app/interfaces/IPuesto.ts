import {IEmpleado} from "./IEmpleado";

export interface IPuesto {
  id: number;
  nombrePuesto: string;
  empleados?: IEmpleado[];
}
