import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceLabelComponent } from './source-label.component';

describe('SourceLabelComponent', () => {
  let component: SourceLabelComponent;
  let fixture: ComponentFixture<SourceLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
