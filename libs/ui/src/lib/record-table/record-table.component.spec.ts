import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTableComponent } from './record-table.component';

describe('RecordTableComponent', () => {
  let component: RecordTableComponent;
  let fixture: ComponentFixture<RecordTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
