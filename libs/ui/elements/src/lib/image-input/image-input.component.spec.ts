import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpHeaders, provideHttpClient } from '@angular/common/http'
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing'
import { ImageInputComponent } from './image-input.component'
import { TranslateModule } from '@ngx-translate/core'

describe('ImageInputComponent', () => {
  let component: ImageInputComponent
  let fixture: ComponentFixture<ImageInputComponent>
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents()
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('file', () => {
    it('should filter only image type files', () => {
      const someNonImageFile = new File([], 'someNonImageFile', {
        type: 'text/plain',
      })
      const someImageFile = new File([], 'someImageFile', { type: 'image/png' })
      const result = component.filterTypeImage([
        someNonImageFile,
        someImageFile,
      ])
      expect(result).toEqual([someImageFile])
    })
  })

  describe('url', () => {
    const testMaxSizeMB = 1
    const testUrl = 'http://test.com/image.png'

    beforeEach(() => {
      component.maxSizeMB = testMaxSizeMB
    })

    it('should emit the downloaded file on nominal case', waitForAsync(() => {
      jest.spyOn(component.fileChange, 'emit')

      component.downloadUrl('http://test.com/image.png')

      const reqHead = httpTestingController.expectOne(testUrl)
      expect(reqHead.request.method).toEqual('HEAD')

      const responseHeaders = new HttpHeaders()
        .set('content-type', 'image/png')
        .set('content-length', '1048575')
      reqHead.flush(null, {
        headers: responseHeaders,
        status: 200,
        statusText: 'OK',
      })

      setTimeout(() => {
        const reqGet = httpTestingController.expectOne(testUrl)
        expect(reqGet.request.method).toEqual('GET')

        reqGet.flush(new Blob())

        expect(component.fileChange.emit).toHaveBeenCalled()
        expect(component.imageFileError).toEqual(false)

        httpTestingController.verify()
      }, 0)
    }))

    it('should not download the file when content-type is not image', waitForAsync(async () => {
      await component.downloadUrl('http://test.com/image.png')

      const reqHead = httpTestingController.expectOne(testUrl)
      expect(reqHead.request.method).toEqual('HEAD')

      const responseHeaders = new HttpHeaders()
        .set('content-type', 'text/plain')
        .set('content-length', '1048575')
      reqHead.flush(null, {
        headers: responseHeaders,
        status: 200,
        statusText: 'OK',
      })

      httpTestingController.verify()
      expect(component.imageFileError).toEqual(true)
    }))

    it('should not download the file when content-length is above limit', waitForAsync(async () => {
      await component.downloadUrl('http://test.com/image.png')

      const reqHead = httpTestingController.expectOne(testUrl)
      expect(reqHead.request.method).toEqual('HEAD')

      const responseHeaders = new HttpHeaders()
        .set('content-type', 'image/png')
        .set('content-length', '1048577')
      reqHead.flush(null, {
        headers: responseHeaders,
        status: 200,
        statusText: 'OK',
      })

      httpTestingController.verify()
      expect(component.imageFileError).toEqual(true)
    }))

    it('should emit the file URL when encountering a download error', waitForAsync(() => {
      jest.spyOn(component.urlChange, 'emit')

      component.downloadUrl('http://test.com/image.png')

      const reqHead = httpTestingController.expectOne(testUrl)
      expect(reqHead.request.method).toEqual('HEAD')

      const responseHeaders = new HttpHeaders()
        .set('content-type', 'image/png')
        .set('content-length', '1048575')
      reqHead.flush(null, {
        headers: responseHeaders,
        status: 200,
        statusText: 'OK',
      })

      setTimeout(() => {
        const reqGet = httpTestingController.expectOne(testUrl)
        expect(reqGet.request.method).toEqual('GET')

        const testError = new ProgressEvent('error', {
          lengthComputable: false,
          loaded: 0,
          total: 0,
        })
        reqGet.error(testError)

        expect(component.urlChange.emit).toHaveBeenCalled()
        expect(component.imageFileError).toEqual(true)
        httpTestingController.verify()
      }, 0)
    }))
  })

  describe('reinitialize errors at dataset rollback', () => {
    beforeEach(() => {
      component.maxSizeMB = 1
    })

    it('should emit KO as altText when downloading invalid url and reset errors when dataset is rollback', waitForAsync(() => {
      jest.spyOn(component.altTextChange, 'emit')
      const nonImageFile = new File([], 'test.txt', { type: 'text/plain' })
      component.handleDropFiles([nonImageFile])
      expect(component.altTextChange.emit).toHaveBeenCalledWith('KO')
      component.altText = 'KO' // Simulate setting altText to KO by the parent component
      expect(component.imageFileError).toBe(true)

      // Simulate component reset ( dataset rollback )
      component.altText = null

      expect(component.uploadError).toBe(false)
      expect(component.imageFileError).toBe(false)
    }))

    it('should emit KO as altText when downloading 404 url and reset errors when dataset is rollback', waitForAsync(async () => {
      jest.spyOn(component.altTextChange, 'emit')

      const downloadPromise = component.downloadUrl(
        'http://test.com/invalid.png'
      )

      const reqHead = httpTestingController.expectOne(
        'http://test.com/invalid.png'
      )
      expect(reqHead.request.method).toEqual('HEAD')

      const responseHeaders = new HttpHeaders()
        .set('content-type', 'image/png')
        .set('content-length', '1048575')
      reqHead.flush(null, {
        headers: responseHeaders,
        status: 404,
        statusText: 'OK',
      })

      await downloadPromise //Await download promise to be resolve and finish emits

      expect(component.altTextChange.emit).toHaveBeenCalledWith('KO')
      component.altText = 'KO' // Simulate setting altText to KO by the parent component
      expect(component.imageFileError).toBe(true)

      // Simulate component reset ( dataset rollback )
      component.altText = null

      expect(component.uploadError).toBe(false)
      expect(component.imageFileError).toBe(false)

      httpTestingController.verify()
    }))
  })
})
