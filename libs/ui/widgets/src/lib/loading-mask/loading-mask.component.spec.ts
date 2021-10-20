import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMaskComponent } from './loading-mask.component';

describe('LoadingMaskComponent', () => {
  let component: LoadingMaskComponent;
  let fixture: ComponentFixture<LoadingMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingMaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
