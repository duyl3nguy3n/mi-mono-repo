import { isEqual } from 'lodash/fp';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  finalize,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

export class SaveSubject<RequestType, ResponseType> {
  private readonly _destroy$ = new Subject<boolean>();

  private _previousSubject: RequestType;

  private _save$: Subject<RequestType>;
  get save$(): Subject<RequestType> {
    return this._save$;
  }

  readonly isSaving$ = new Subject<boolean>();

  // #region PRIVATE METHODS

  /**
   * Create rxjs filter operator for filtering for different save subject.
   *
   * @returns Rxjs filter operator
   */
  private _filterForDifferentSaveSubject() {
    return filter<RequestType>((saveSubject) => {
      const differences = this._getObjectDiff(
        saveSubject,
        this._previousSubject,
      );
      return !!differences.length;
    });
  }

  /**
   * Compare 2 objects for any different between them.
   *
   * @param obj1 Object 1 to be compared
   * @param obj2 Object 2 to be compared
   * @returns Array of property keys that are different in value
   */
  private _getObjectDiff(obj1: RequestType, obj2: RequestType) {
    const diff = Object.keys(obj1).reduce((result, key) => {
      if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
        result.push(key);
      } else if (isEqual(obj1[key], obj2[key])) {
        const resultKeyIndex = result.indexOf(key);
        result.splice(resultKeyIndex, 1);
      }
      return result;
    }, Object.keys(obj2));

    return diff;
  }

  /**
   * Create rxjs switch map operator to execute the save function.
   *
   * @param saveFn The save function to be execute
   * @returns Rxjs switch map operator
   */
  private _saveSaveSubject(
    saveFn: (saveSubject: RequestType) => Observable<ResponseType>,
  ) {
    return switchMap<RequestType, Observable<ResponseType>>((saveSubject) => {
      this.isSaving$.next(true);
      this.setPreviousSubject(saveSubject);
      return saveFn(saveSubject).pipe(
        finalize(() => this.isSaving$.next(false)),
      );
    });
  }

  // #endregion

  // #region PUBLIC METHODS

  /**
   * Set the previous subject that was saved or will be saved.
   *
   * @param previousSubject The new previous subject
   */
  setPreviousSubject(previousSubject: RequestType) {
    this._previousSubject = previousSubject;
  }

  /**
   * Setup debounce config which will schedule a save function whenever a save is emitted at given debounce time.
   * Subsequence save will cancel the previous one if the debounce time has not been passed
   * and will be executed only if the next save subject is different from the previous save subject.
   *
   * @usageExample
    ```ts
    const saveSubject = new SaveSubject<PersonDto,PersonModel>().setupDebounceConfig(
      this.httpService.savePerson.bind(this.httpService),
      (response) => {},
      (err) => {},
      10000,
      this._destroy$,
    );
    saveSubject.next(personDto1); // this save will be cancel
    saveSubject.next(personDto2); // this save will be executed after 10 sec
    ```
   *
   * @param saveFn The save function to be executed
   * @param successFn The success function callback
   * @param errorFn The error function callback
   * @param saveDebounceTime The save debounce time
   * @param destroy$ Destroy subject so we can do clean up
   * @returns
   */
  setupDebounceConfig(
    saveFn: (saveSubject: RequestType) => Observable<ResponseType>,
    successFn: (response: ResponseType) => void,
    errorFn: (err: any) => void,
    saveDebounceTime: number,
    destroy$?: Subject<boolean>,
  ) {
    if (this._save$) {
      throw new Error('Save subject is already configured.');
    }

    this._save$ = new Subject<RequestType>();

    this._save$
      .pipe(
        takeUntil(destroy$ ?? this._destroy$),
        debounceTime(saveDebounceTime),
        this._filterForDifferentSaveSubject(),
        this._saveSaveSubject(saveFn),
      )
      .subscribe({ next: successFn, error: errorFn });
    return this;
  }

  destroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
  // #endregion
}
