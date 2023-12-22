import { IPuesto } from "./IPuesto"
import {IDependiente} from "./IDependiente";
export interface IEmpleado {
  codigoEmpleado: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  salarioFijo: number;
  pagaImpuestoRenta?: boolean;
  puestoId: number;
  puesto?: IPuesto;
  codigoImpuestoRenta?: string;
  numeroDependientes?: number;
  dependientes?: IDependiente[];
}
