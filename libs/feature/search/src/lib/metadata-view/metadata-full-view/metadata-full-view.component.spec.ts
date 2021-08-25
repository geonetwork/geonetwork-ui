import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataFullViewComponent } from './metadata-full-view.component';

describe('MetadataFullViewComponent', () => {
  let component: MetadataFullViewComponent;
  let fixture: ComponentFixture<MetadataFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataFullViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
