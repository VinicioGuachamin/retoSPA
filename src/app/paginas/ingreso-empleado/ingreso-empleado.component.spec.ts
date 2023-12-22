import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoEmpleadoComponent } from './ingreso-empleado.component';

describe('IngresoEmpleadoComponent', () => {
  let component: IngresoEmpleadoComponent;
  let fixture: ComponentFixture<IngresoEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
