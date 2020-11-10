import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDataRulesComponent } from './upload-data-rules.component';

describe('UploadDataRulesComponent', () => {
  let component: UploadDataRulesComponent;
  let fixture: ComponentFixture<UploadDataRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDataRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
