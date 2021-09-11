import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MetadataModel } from '@silo/metadata';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormDefinitionModel } from '../../form-builder/models/definitions/form-definition-model';
import { FormElementNodeModel } from '../../form-builder/models/form-element-node-model';
import { FormElementNodeModelExtensions } from '../../form-builder/models/form-element-node-model-extensions';
import { MetadataFormListComponent } from './metadata-form-list/metadata-form-list.component';
import { MetadataFormService } from './services/metadata-form.service';

@Component({
  selector: 'silo-metadata-form',
  templateUrl: './metadata-form.component.html',
  styleUrls: ['./metadata-form.component.scss'],
})
export class MetadataFormComponent implements OnInit {
  private _destroy$ = new Subject<void>();

  /** The form definition model that will be built from metadata model */
  formDefinitionModel: FormDefinitionModel;

  /** The node model that will be map from form definition model */
  nodeModel: FormElementNodeModel;

  /** The metadata model that need to be rendered */
  @Input()
  metadataModel: MetadataModel;

  /** When there is a new form value, emit it */
  @Output()
  newFormValue = new EventEmitter();

  constructor(
    @Optional()
    private _metadataFormListComponent: MetadataFormListComponent,
    private _metadataFormService: MetadataFormService,
  ) {}

  ngOnInit() {
    // build form definition model from metadata model
    this.formDefinitionModel = this._metadataFormService.createFormDefinition(
      this.metadataModel,
    );

    // build node model from form form definition model
    this.nodeModel = FormElementNodeModelExtensions.mapFromFormDefinitionModel(
      this.formDefinitionModel,
      this.formDefinitionModel.rootMemberKey,
    );

    // if there is parent form list, add this form group to parent form array
    if (this._metadataFormListComponent) {
      this._metadataFormListComponent.nodeModel.instance.formArray.push(
        this.nodeModel.instance.formGroup,
      );
    }

    // emit new form value handler
    this.nodeModel.instance.formGroup.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.emitNewFormValue());
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  emitNewFormValue(): void {
    if (this.nodeModel.instance.formGroup.invalid) {
      this.nodeModel.instance.formGroup.markAllAsTouched();
      return;
    }

    this.newFormValue.emit(this.nodeModel.formValueInstance);
  }
}
