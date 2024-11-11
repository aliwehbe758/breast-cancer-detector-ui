import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionHComponent } from './prediction-h.component';

describe('PredictionHComponent', () => {
  let component: PredictionHComponent;
  let fixture: ComponentFixture<PredictionHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionHComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
