import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'

@Injectable()
export class MapEffects {
  constructor(private readonly actions$: Actions) {}
}
