import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MetadataModel } from '@silo/metadata';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormElementNodeModel } from '../../form-builder/models/form-element-node-model';
import { FormElementNodeModelExtensions } from '../../form-builder/models/form-element-node-model-extensions';
import { MetadataFormService } from '../services/metadata-form.service';

@Component({
  selector: 'silo-metadata-form',
  templateUrl: './metadata-form.component.html',
  styleUrls: ['./metadata-form.component.scss'],
})
export class MetadataFormComponent implements OnInit, AfterViewInit {
  private _destroy$ = new Subject<void>();

  nodeModel: FormElementNodeModel;

  @Input()
  metadataModel: MetadataModel;

  @Output()
  newFormValue = new EventEmitter();

  constructor(private _metadataFormService: MetadataFormService) {}

  ngOnInit() {
    const formDefinitionModel = this._metadataFormService.createFormDefinition(
      this.metadataModel,
    );

    this.nodeModel = FormElementNodeModelExtensions.mapFromFormDefinitionModel(
      formDefinitionModel,
      formDefinitionModel.rootMemberKey,
    );
  }

  ngAfterViewInit(): void {
    this.nodeModel.instance.formGroup.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.emitNewDefinitionModel());
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  emitNewDefinitionModel(): void {
    if (this.nodeModel.instance.formGroup.invalid) {
      this.nodeModel.instance.formGroup.markAllAsTouched();
      return;
    }

    this.newFormValue.emit(this.nodeModel.formValueInstance);
  }
}
