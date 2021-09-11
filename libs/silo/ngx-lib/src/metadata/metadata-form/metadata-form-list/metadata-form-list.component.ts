import {
  Component,
  Input,
  OnInit,
  Optional,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { cloneDeep } from 'lodash/fp';
import { FormElementNodeModel } from '../../../form-builder/models/form-element-node-model';
import { GetFormValue } from '../../../form-builder/models/get-form-value';
import { HasNodeModel } from '../../../form-builder/models/has-node-model';
import { MetadataFormGroupComponent } from '../metadata-form-group/metadata-form-group.component';
import { MetadataFormListItemComponent } from '../metadata-form-list-item/metadata-form-list-item.component';
import { MetadataFormListItemRef } from '../models/metadata-form-list-item-ref';

@Component({
  selector: 'silo-metadata-form-list',
  templateUrl: './metadata-form-list.component.html',
  styleUrls: ['./metadata-form-list.component.scss'],
})
export class MetadataFormListComponent
  implements HasNodeModel, OnInit, GetFormValue {
  itemRefs: Array<MetadataFormListItemRef> = [];

  @Input()
  nodeModel: FormElementNodeModel = null;

  @ViewChildren(MetadataFormListItemComponent)
  itemComponentRefs: QueryList<MetadataFormListItemComponent>;

  constructor(
    @Optional()
    private _metadataFormGroupComponent: MetadataFormGroupComponent,
  ) {}

  ngOnInit() {
    // init form array for this instance
    this.nodeModel.instance.formArray = new FormArray([]);
    // add form array to parent metadata-form-group
    if (this._metadataFormGroupComponent) {
      this._metadataFormGroupComponent.nodeModel.instance.formGroup.addControl(
        this.nodeModel.definitionModel.propertyKey,
        this.nodeModel.instance.formArray,
      );
    }

    if (Array.isArray(this.nodeModel.definitionModel.defaultValue)) {
      this.nodeModel.definitionModel.defaultValue.forEach((value) =>
        this.addItem(value),
      );
    }
  }

  addItem(defaultValue: unknown = null) {
    // create new item metadata model
    const itemMetadataModel = this.nodeModel.definitionModel.itemMetadataModel();
    // merge default value to metadata model which should have the same shape
    if (defaultValue) {
      Object.keys(defaultValue).forEach((key) => {
        itemMetadataModel[key] =
          typeof defaultValue[key] === 'object'
            ? cloneDeep(defaultValue[key])
            : defaultValue[key];
      });
    }
    // add item reference to be rendered
    this.itemRefs.push({
      index: this.itemRefs.length,
      metadataModel: itemMetadataModel,
    });
  }

  removeItem(index: number) {
    this.itemRefs.splice(index, 1);
    // do this next cycle where item component refs has been updated
    // where the component has been removed so form value will be correct
    setTimeout(() => {
      this.nodeModel.instance.formArray.removeAt(index);
    });
  }

  getFormValue(): unknown {
    return this.itemComponentRefs.map((x) => x.formValueInstance);
  }
}
