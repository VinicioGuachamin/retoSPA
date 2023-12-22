import {IDependiente} from "./IDependiente";

export interface IParentesco {
  id: number;
  descripcion: string;
  dependientes?: IDependiente[];
}
