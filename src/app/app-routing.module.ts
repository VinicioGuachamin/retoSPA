import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultaEmpleadosComponent} from "./paginas/consulta-empleados/consulta-empleados.component";
import {IngresoEmpleadoComponent} from "./paginas/ingreso-empleado/ingreso-empleado.component";
import {EmpleadosComponent} from "./paginas/empleados/empleados.component";
import {DependientesComponent} from "./paginas/dependientes/dependientes.component";

const routes: Routes = [
  {
    path: '',
    component: EmpleadosComponent
  },
  {
    path: 'consulta-empleados',
    component: ConsultaEmpleadosComponent
  },
  {
    path: 'ingreso-empleado',
    component: IngresoEmpleadoComponent
  },
  {
    path: 'dependientes',
    component: DependientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
