import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Title } from '@angular/platform-browser'

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    private titleSubject = new BehaviorSubject<string>('')
    title$ = this.titleSubject.asObservable()

    constructor() { }

    setTitle(newTitle: string) {
        this.titleSubject.next(newTitle)
    }
}
