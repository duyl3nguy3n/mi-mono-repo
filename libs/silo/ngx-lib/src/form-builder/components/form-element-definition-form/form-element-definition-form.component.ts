import { Component, Input, OnDestroy } from '@angular/core';
import { merge } from 'lodash';
import { Subject } from 'rxjs';
import { FormBuilderComponent } from '../../form-builder.component';
import { FormElementDefinitionModel } from '../../models/definitions/form-element-definition-model';
import { UpdateFormElementDefinitionEvent } from '../../models/form-builder-events';
import { FormElementNodeModel } from '../../models/form-element-node-model';
import { HasNodeModel } from '../../models/has-node-model';

@Component({
  selector: 'silo-form-element-definition-form',
  templateUrl: './form-element-definition-form.component.html',
  styleUrls: ['./form-element-definition-form.component.scss'],
})
export class FormElementDefinitionFormComponent
  implements HasNodeModel, OnDestroy {
  private _destroy$ = new Subject<void>();

  @Input()
  nodeModel: FormElementNodeModel;

  constructor(private _formBuilderComponent: FormBuilderComponent) {}

  emitUpdate(formValue: FormElementDefinitionModel): void {
    const event = new UpdateFormElementDefinitionEvent();
    event.formElementDefinitionModel = merge(
      {},
      this.nodeModel.definitionModel,
      formValue,
    );
    this._formBuilderComponent.handleEvent.next(event);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
