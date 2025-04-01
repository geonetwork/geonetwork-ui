import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCatalogComponent } from './feature-catalog.component';

describe('FeatureCatalogComponent', () => {
  let component: FeatureCatalogComponent;
  let fixture: ComponentFixture<FeatureCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
