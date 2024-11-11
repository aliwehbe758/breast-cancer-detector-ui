import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretrainedModelsComponent } from './pretrained-models.component';

describe('PretrainedModelsComponent', () => {
  let component: PretrainedModelsComponent;
  let fixture: ComponentFixture<PretrainedModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PretrainedModelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PretrainedModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
