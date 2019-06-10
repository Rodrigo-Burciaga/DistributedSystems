import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowButtonServiceService {

  stateSource = new BehaviorSubject(false);
  public currentState = this.stateSource.asObservable();

  stateSource1 = new BehaviorSubject(0);
  public currentState1 = this.stateSource1.asObservable();

  constructor() { }

  changeState(state: boolean): void {
    this.stateSource.next(state);
  }

  changeState1(state: number): void {
    this.stateSource1.next(state);
  }
}
