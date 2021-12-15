import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoViewComponent } from './grafico-view.component';

describe('GraficoViewComponent', () => {
  let component: GraficoViewComponent;
  let fixture: ComponentFixture<GraficoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
