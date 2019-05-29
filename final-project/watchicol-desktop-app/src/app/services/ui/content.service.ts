import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  stateSource = new BehaviorSubject('Título');
  public currentTitle = this.stateSource.asObservable();

  constructor() { }

  changeState(title: string): void {
    this.stateSource.next(title);
  }
}
