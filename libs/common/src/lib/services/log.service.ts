import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor() {}
  log(message: string): void {
    console.log(message)
  }
  warn(message: string): void {
    console.warn(message)
  }
  error(message: string): void {
    console.error(message)
  }
}
