import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDependiente} from "../../interfaces/IDependiente";

@Component({
  selector: 'app-detalle-dependiente',
  templateUrl: './detalle-dependiente.component.html',
  styleUrls: ['./detalle-dependiente.component.css']
})
export class DetalleDependienteComponent implements OnInit{
  @Output() cerrarModalEvent = new EventEmitter<any>();
  @Input() listaDependientes: Array<IDependiente> | undefined ;
  ngOnInit(): void {
  }

  cerrarModal(): void {
    this.cerrarModalEvent.emit();
  }
}
