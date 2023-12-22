import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GeneralService} from "../../servicios/general.service";
import {IEmpleado} from "../../interfaces/IEmpleado";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {IDependiente} from "../../interfaces/IDependiente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit{
  @ViewChild('modalEditar') templateModalEditar: TemplateRef<any> | undefined;
  @ViewChild('modalDependientes') templateModalEditar2: TemplateRef<any> | undefined;
  public listaEmpleados: Array<IEmpleado> | undefined ;
  public listaD: Array<IDependiente> | undefined ;
  public modal: any;
  public idEditar: any = null;
  public listaDependientes: Array<IDependiente> | undefined ;
  nombre: any;
  apellido: any;
  codEmpleado: any;
  parentForm!: FormGroup;
  showError: boolean = false;

  constructor(private generalService: GeneralService, private modalService: NgbModal, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      cod: [''],
    });

    this.GetEmpleados();
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

  EditarEmpleado(codigo:number){
    this.idEditar = codigo;
    this.modal = this.modalService.open(this.templateModalEditar, { size: 'xl', backdrop: 'static', keyboard: false })
  }

  VerDependientes(codigo:number){

    this.generalService.ObtenerDependientesPorEmpleado(codigo).subscribe((resp) => {
        //const resultado = resp as Array<IDependiente>;
        this.listaD = resp as Array<IDependiente>;
        this.modal = this.modalService.open(this.templateModalEditar2, { size: 'xl', backdrop: 'static', keyboard: false })
        console.log(this.listaD);
      },
      (error) => {
        console.error('Error al insertar empleado:', error);
      });
  }

  CrearEmpelado(){
    this.modal = this.modalService.open(this.templateModalEditar, { size: 'xl', backdrop: 'static', keyboard: false })
  }

  CerrarModal(): void {
    this.GetEmpleados();
    this.modal.close();
  }

  public Eliminarempleado(codigo:number) {
    Swal.fire({
      title: "¿Esta seguro de eliminar?",
      text: "Una vez eliminado el empleado no sera posible recuperarlo",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si, Eliminar Empleado"
    }).then((result) => {

      if (result.value) {
        this.generalService.EliminarEmpleado(codigo).subscribe(
          () => {
            console.log('Empleado eliminado correctamente.');
            this.GetEmpleados();
            Swal.fire({
              icon: "success",
              title: "Empleado Eliminado Correctamente",
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            console.error('Error al eliminar empleado:', error);
            Swal.fire({
              title: "Error",
              text: "Ocurrió algun problema",
              icon: "error"
            });
          }
        );
      }
    });

  }

  Buscar(){
    const dataForm = this.parentForm.value;
    console.log(dataForm.nombre, dataForm.cod, dataForm.apellido);

    if (dataForm.nombre == "" && dataForm.cod == "" && dataForm.apellido == ""){
      this.GetEmpleados();
      this.showError = false;
    }else {
      if (dataForm.nombre == ""){
        //dataForm.nombre = null;
        this.showError = true;
      }

      if (dataForm.apellido == ""){
        //dataForm.apellido = null;
        this.showError = true;
      }

      if (dataForm.cod == ""){
        //dataForm.cod = null;
        this.showError = true;
      }

      this.generalService.BuscarEmpleados(dataForm.cod, dataForm.nombre,dataForm.apellido).subscribe((resp) => {
          const resultado = resp as Array<IEmpleado>;
          this.listaEmpleados = resultado;
        },
        (error) => {
          console.error('Error al insertar empleado:', error);
        });
    }



  }
}
