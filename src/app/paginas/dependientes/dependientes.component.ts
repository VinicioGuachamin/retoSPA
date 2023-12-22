import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GeneralService} from "../../servicios/general.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IEmpleado} from "../../interfaces/IEmpleado";
import {IDependiente} from "../../interfaces/IDependiente";

@Component({
  selector: 'app-dependientes',
  templateUrl: './dependientes.component.html',
  styleUrls: ['./dependientes.component.css']
})
export class DependientesComponent implements OnInit{
  public modal: any;
  @ViewChild('modalEditarD') templateModalEditar: TemplateRef<any> | undefined;
  public listaDependientes: Array<IDependiente> | undefined ;
  constructor(private generalService: GeneralService, private modalService: NgbModal) {
  }
  ngOnInit(): void {
    this.GetDependientes();
  }

  CrearDependiente(){
    this.modal = this.modalService.open(this.templateModalEditar, { size: 'xl', backdrop: 'static', keyboard: false })
  }

  CerrarModal(): void {
    this.GetDependientes();
    this.modal.close();
  }

  GetDependientes(){
    this.generalService.ObtenerListaDependientes().subscribe((resp) => {
        const resultado = resp as Array<IDependiente>;
        this.listaDependientes = resultado;
        console.log(resp, this.listaDependientes);
      },
      (error) => {
        console.error('Error al insertar empleado:', error);
      });
  }
}
