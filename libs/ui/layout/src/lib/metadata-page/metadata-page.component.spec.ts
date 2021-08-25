import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataPageComponent } from './metadata-page.component';

describe('MetadataPageComponent', () => {
  let component: MetadataPageComponent;
  let fixture: ComponentFixture<MetadataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
