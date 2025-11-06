import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { GnUiHumanizeDateDirective } from './humanize-date.directive'
import { DateService } from './services/date.service'

@Component({
  template: `
    <p [gnUiHumanizeDate]="testDate"></p>
    <p [gnUiHumanizeDate]="nullDate"></p>
  `,
  standalone: true,
  imports: [GnUiHumanizeDateDirective],
})
class TestComponent {
  testDate = new Date('2024-11-01T10:00:00Z')
  nullDate: Date | null = null
}

describe('GnUiHumanizeDateDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let dateService: DateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        {
          provide: DateService,
          useValue: {
            formatDateTime: jest
              .fn()
              .mockReturnValue('November 1, 2024, 10:00:00 AM'),
            formatRelativeDateTime: jest.fn().mockResolvedValue('5 days ago'),
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    dateService = TestBed.inject(DateService)
  })

  it('should set title attribute with formatted datetime', async () => {
    fixture.detectChanges()
    await fixture.whenStable()

    const el = fixture.debugElement.query(By.css('p'))
    expect(el.nativeElement.getAttribute('title')).toBe(
      'November 1, 2024, 10:00:00 AM'
    )
  })

  it('should set text content with relative date', async () => {
    fixture.detectChanges()
    await fixture.whenStable()

    const el = fixture.debugElement.query(By.css('p'))
    expect(el.nativeElement.textContent).toBe('5 days ago')
  })

  it('should not update element when date is null', async () => {
    fixture.detectChanges()
    await fixture.whenStable()

    const elements = fixture.debugElement.queryAll(By.css('p'))
    const nullElement = elements[1]

    expect(nullElement.nativeElement.getAttribute('title')).toBeFalsy()
    expect(nullElement.nativeElement.textContent.trim()).toBe('')
  })
})
