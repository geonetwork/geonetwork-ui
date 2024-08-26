import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineResourceCardComponent } from './online-resource-card.component';

describe('OnlineResourceCardComponent', () => {
  let component: OnlineResourceCardComponent;
  let fixture: ComponentFixture<OnlineResourceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OnlineResourceCardComponent]
    });
    fixture = TestBed.createComponent(OnlineResourceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
