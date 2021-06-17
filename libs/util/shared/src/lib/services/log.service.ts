import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LogService {
  log(message: string, ...objects: any[]): void {
    console.log.apply(this, [message, ...objects])
  }
  warn(message: string, ...objects: any[]): void {
    console.warn.apply(this, [message, ...objects])
  }
  error(message: string, ...objects: any[]): void {
    console.error.apply(this, [message, ...objects])
  }
}
