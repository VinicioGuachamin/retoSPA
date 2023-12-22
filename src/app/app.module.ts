import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaEmpleadosComponent } from "./paginas/consulta-empleados/consulta-empleados.component";
import { IngresoEmpleadoComponent } from './paginas/ingreso-empleado/ingreso-empleado.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EmpleadosComponent } from './paginas/empleados/empleados.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DependientesComponent } from './paginas/dependientes/dependientes.component';
import { IngresoDependienteComponent } from './paginas/ingreso-dependiente/ingreso-dependiente.component';
import { DetalleDependienteComponent } from './paginas/detalle-dependiente/detalle-dependiente.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaEmpleadosComponent,
    IngresoEmpleadoComponent,
    EmpleadosComponent,
    DependientesComponent,
    IngresoDependienteComponent,
    DetalleDependienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
