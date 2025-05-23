import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { AvatarComponent } from './avatar.component'

describe('AvatarComponent', () => {
  let component: AvatarComponent
  let fixture: ComponentFixture<AvatarComponent>
  let img: DebugElement
  let fallback: DebugElement

  function initDebugElements() {
    fixture.detectChanges()
    img = fixture.debugElement.query(By.css('img'))
    fallback = fixture.debugElement.query(By.css('div'))
  }

  beforeEach(async () => {
    await TestBed.overrideComponent(AvatarComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    }).compileComponents()

    fixture = TestBed.createComponent(AvatarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Behavior', () => {
    describe('When existing url', () => {
      beforeEach(() => {
        component.avatarUrl = 'url'
        initDebugElements()
      })
      it('the <img> is displayed', () => {
        expect(img).toBeTruthy()
      })
      it('the <img> src is the url', () => {
        expect(img.attributes.src).toEqual('url')
      })
      it('the fallback is hidden', () => {
        expect(fallback).toBeFalsy()
      })
    })
    describe('When the url is on error', () => {
      beforeEach(() => {
        component.avatarUrl = 'url'
        component.avatarPlaceholder = 'urlBis'
        initDebugElements()
        jest.spyOn(component, 'hideImage')
        img.triggerEventHandler('error')
        initDebugElements()
      })
      it('calls hideImage()', () => {
        expect(component.hideImage).toHaveBeenCalled()
        expect(component.avatarUrl).toEqual('urlBis')
      })
      it('the <img> is not displayed', () => {
        expect(img.attributes.src).toEqual('urlBis')
      })
    })
    describe('When no url is given', () => {
      beforeEach(() => {
        component.avatarUrl = undefined
        initDebugElements()
      })
      it('the <img> is not displayed', () => {
        expect(img).toBeFalsy()
      })
      it('the fallback is displayed', () => {
        expect(fallback).toBeTruthy()
      })
    })
  })
})
