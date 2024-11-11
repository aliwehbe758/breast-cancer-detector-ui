import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionDComponent } from './prediction-d.component';

describe('PredictionDComponent', () => {
  let component: PredictionDComponent;
  let fixture: ComponentFixture<PredictionDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
