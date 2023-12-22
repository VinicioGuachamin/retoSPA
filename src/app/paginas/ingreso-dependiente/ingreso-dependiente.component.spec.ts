import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoDependienteComponent } from './ingreso-dependiente.component';

describe('IngresoDependienteComponent', () => {
  let component: IngresoDependienteComponent;
  let fixture: ComponentFixture<IngresoDependienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoDependienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoDependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
