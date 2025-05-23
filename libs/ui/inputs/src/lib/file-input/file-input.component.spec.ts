import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FileInputComponent } from './file-input.component'
import { By } from '@angular/platform-browser'
import { UrlInputComponent } from '../url-input/url-input.component'
import { ChangeDetectionStrategy } from '@angular/core'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('FileInputComponent', () => {
  let component: FileInputComponent
  let fixture: ComponentFixture<FileInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    })
      .overrideComponent(FileInputComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputComponent)
    component = fixture.componentInstance
    component.maxSizeMB = 10
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('fileChange', () => {
    it('emits the selected file', () => {
      const someFile = new File([], 'file.txt', {
        type: 'text/plain',
      })
      let emitted
      component.fileChange.subscribe((v) => (emitted = v))
      component.handleDropFiles([someFile])
      expect(emitted).toEqual(someFile)
    })
  })

  describe('url', () => {
    it('emits the entered URL', () => {
      let emitted
      component.urlChange.subscribe((v) => (emitted = v))
      component.handleUrlChange('http://hello.world')
      expect(emitted).toEqual('http://hello.world')
    })
  })

  describe('upload ongoing', () => {
    beforeEach(() => {
      component.uploadProgress = 12
      fixture.detectChanges()
    })
    it('disables the url input', () => {
      const input = fixture.debugElement.query(
        By.directive(UrlInputComponent)
      ).componentInstance
      expect(input.disabled).toBe(true)
    })
    it('emits a cancel event on click', () => {
      let emitted = false
      component.uploadCancel.subscribe(() => (emitted = true))
      component.handleCancel()
      expect(emitted).toBe(true)
    })
  })
})
