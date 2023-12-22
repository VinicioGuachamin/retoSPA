import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../servicios/general.service";
import {IPuesto} from "../../interfaces/IPuesto";
import {IEmpleado} from "../../interfaces/IEmpleado";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ingreso-empleado',
  templateUrl: './ingreso-empleado.component.html',
  styleUrls: ['./ingreso-empleado.component.css']
})
export class IngresoEmpleadoComponent implements OnInit{
  empleadoForm!: FormGroup;
  listaPuestos: IPuesto[] = [];
  empleado: IEmpleado | undefined;
  @Output() cerrarModalEvent = new EventEmitter<any>();
  @Input() idEditar!: number;
  constructor(private fb: FormBuilder, private generalService: GeneralService) {}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      salarioFijo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      pagaImpuestoRenta: [false],
      puestoId: ['', Validators.required],
      codigoImpuestoRenta: ['', Validators.pattern(/[A-C]/)],
      numeroDependientes: ['', Validators.min(0)]
    });

    this.cargarListaPuestos();

    if (this.idEditar) {
      this.GetEmpleadoByCodigo();
    }

  }

  GetEmpleadoByCodigo(){
    this.generalService.ObtenerEmpleadoPorCodigo(this.idEditar).subscribe(
      (resp) => {
        console.log(resp)
        this.empleado = resp as IEmpleado;
        this.empleadoForm.controls['nombre'].setValue(this.empleado.nombre);
        this.empleadoForm.controls['apellido'].setValue(this.empleado.apellido);
        this.empleadoForm.controls['fechaNacimiento'].setValue(this.empleado.fechaNacimiento);
        this.empleadoForm.controls['salarioFijo'].setValue(this.empleado.salarioFijo);
        this.empleadoForm.controls['pagaImpuestoRenta'].setValue(this.empleado.pagaImpuestoRenta);
        this.empleadoForm.controls['puestoId'].setValue(this.empleado.puestoId);
        this.empleadoForm.controls['codigoImpuestoRenta'].setValue(this.empleado.codigoImpuestoRenta);
        this.empleadoForm.controls['numeroDependientes'].setValue(this.empleado.numeroDependientes);
      },
      (error) => {
        console.error('Error al obtener la lista de puestos:', error);
      }
    );
  }

  cargarListaPuestos() {
    this.generalService.ObtenerListaPuestos().subscribe(
      (puestos) => {
        this.listaPuestos = puestos as IPuesto[];

      },
      (error) => {
        console.error('Error al obtener la lista de puestos:', error);
      }
    );
  }

  onSubmit() {
    if (this.empleadoForm.valid) {
      const nuevoEmpleado: IEmpleado = this.empleadoForm.value;
      console.log(nuevoEmpleado);
      if(this.idEditar) {
        nuevoEmpleado.codigoEmpleado = this.idEditar;
        this.generalService.ActualizarEmpleado(this.idEditar, nuevoEmpleado).subscribe(
          (empleadoInsertado) => {
            console.log('Empleado editado exitosamente:', empleadoInsertado);
            this.cerrarModal();
            Swal.fire({
              icon: "success",
              title: "Empleado Editado Correctamente",
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            console.error('Error al editar empleado:', error);
            Swal.fire({
              title: "Error",
              text: "Ocurrió algun problema",
              icon: "error"
            });
          }
        );
      }else {
        this.generalService.InsertarEmpleado(nuevoEmpleado).subscribe(
          (empleadoInsertado) => {
            console.log('Empleado insertado exitosamente:', empleadoInsertado);
            this.cerrarModal();
            Swal.fire({
              icon: "success",
              title: "Empleado Ingresado Correctamente",
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            console.error('Error al insertar empleado:', error);
            Swal.fire({
              title: "Error",
              text: "Ocurrió algun problema",
              icon: "error"
            });
          }
        );
      }

    } else {
      console.log('Formulario no válido. Revise los campos.');
      Swal.fire({
        title: "Advertencia",
        text: "Formulario no valido. Revise los campos",
        icon: "info"
      });
    }
  }

  cerrarModal(): void {
    this.cerrarModalEvent.emit();
  }
}
