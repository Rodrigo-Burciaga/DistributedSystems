import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowButtonServiceService {

  stateSource = new BehaviorSubject(false);
  public currentState = this.stateSource.asObservable();

  constructor() { }

  changeState(state: boolean): void {
    this.stateSource.next(state);
  }
}
