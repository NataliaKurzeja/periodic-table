import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PeriodicElement } from './interfaces/periodic-element.interface';
import { ELEMENT_DATA } from './mocked-data';

@Injectable({ providedIn: 'root' })
export class FakeHttpService {
  constructor() {}

  getElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
