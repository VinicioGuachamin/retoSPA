import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../servicios/general.service";
import {IEmpleado} from "../../interfaces/IEmpleado";
import {IParentesco} from "../../interfaces/IParentesco";
import Swal from "sweetalert2";
import {IDependiente} from "../../interfaces/IDependiente";

@Component({
  selector: 'app-ingreso-dependiente',
  templateUrl: './ingreso-dependiente.component.html',
  styleUrls: ['./ingreso-dependiente.component.css']
})
export class IngresoDependienteComponent implements OnInit{
  public listaEmpleados: Array<IEmpleado> | undefined ;
  public listaParentescos: Array<IParentesco> | undefined ;
  parentForm!: FormGroup;
  @Output() cerrarModalEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private generalService: GeneralService) {
  }

  ngOnInit(): void {

    this.parentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      parentescoId: ['', Validators.required],
      empleadoId: ['', Validators.required],
    });

    this.GetEmpleados();
    this.GetParentescos();
  }

  GetEmpleados(){
    this.generalService.ObtenerListaEmpleados().subscribe((resp) => {
        const resultado = resp as Array<IEmpleado>;
        this.listaEmpleados = resultado;
        console.log(resp, this.listaEmpleados);
      },
      (error) => {
        console.error('Error al insertar empleado:', error);
      });
  }

  GetParentescos(){
    this.generalService.ObtenerListaParentescos().subscribe((resp) => {
        const resultado = resp as Array<IParentesco>;
        this.listaParentescos = resultado;
      },
      (error) => {
        console.error('Error al insertar empleado:', error);
      });
  }

  onSubmit() {
    if (this.parentForm.valid) {
      const nuevo: IDependiente = this.parentForm.value;
      console.log(nuevo);
      this.generalService.InsertarDependiente(nuevo).subscribe(
        (empleadoInsertado) => {
          this.cerrarModal();
          Swal.fire({
            icon: "success",
            title: "Ingresado Correctamente",
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          console.error('Error al insertar:', error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió algun problema",
            icon: "error"
          });
        }
      );
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
