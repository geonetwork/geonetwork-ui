import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPreviewMapComponent } from './data-preview-map.component';

describe('DataPreviewMapComponent', () => {
  let component: DataPreviewMapComponent;
  let fixture: ComponentFixture<DataPreviewMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPreviewMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPreviewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
