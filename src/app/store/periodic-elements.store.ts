import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { FakeHttpService } from '../shared/fake-http.service';
import { PeriodicElement } from '../shared/interfaces/periodic-element.interface';

interface PeriodicElementsState {
  model: PeriodicElement[];
  loading: boolean;
}

const initialState: PeriodicElementsState = {
  model: [],
  loading: false,
};

export const PeriodicElementsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, fakeHttpService = inject(FakeHttpService)) => ({
    loadData: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => {
          return fakeHttpService.getElements().pipe(
            tapResponse({
              next: (elements) => patchState(store, { model: elements }),
              error: console.error,
              finalize: () => patchState(store, { loading: false }),
            })
          );
        })
      )
    ),

    editData: (editedData: PeriodicElement) => {
      patchState(store, (state) => ({
        model: state.model.map((el) =>
          el.position !== editedData.position ? el : editedData
        ),
      }));
    },
  }))
);
