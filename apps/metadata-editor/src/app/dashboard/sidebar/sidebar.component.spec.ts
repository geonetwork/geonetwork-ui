import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { SidebarComponent } from './sidebar.component'
import { ActivatedRoute } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(SidebarComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
