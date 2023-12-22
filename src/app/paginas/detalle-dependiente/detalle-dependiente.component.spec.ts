import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDependienteComponent } from './detalle-dependiente.component';

describe('DetalleDependienteComponent', () => {
  let component: DetalleDependienteComponent;
  let fixture: ComponentFixture<DetalleDependienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDependienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
