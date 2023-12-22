import {IParentesco} from "./IParentesco";
import {IEmpleado} from "./IEmpleado";

export interface IDependiente {
  codigoDependiente: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  parentescoId: number;
  parentesco: IParentesco;
  empleadoId: number;
  empleado: IEmpleado;
}
