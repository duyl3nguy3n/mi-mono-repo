import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PropertyMetadata } from '@silo/metadata';
import { merge } from 'lodash';
import { FormElementNodeModel } from '../../form-builder/models/form-element-node-model';
import { instanceOfHasFormGroup } from '../../form-builder/models/has-form-group';
import {
  HasNodeModel,
  instanceOfHasNodeModel,
} from '../../form-builder/models/has-node-model';
import { MetadataFormGroupComponent } from '../metadata-form-group/metadata-form-group.component';
import { MetadataTemplateRegistryService } from '../services/metadata-template-registry.service';

@Component({
  selector: 'silo-metadata-form-element-portal',
  templateUrl: './metadata-form-element-portal.component.html',
  styleUrls: ['./metadata-form-element-portal.component.scss'],
})
export class MetadataFormElementPortalComponent
  implements OnInit, OnChanges, OnDestroy, HasNodeModel {
  @Input()
  nodeModel: FormElementNodeModel;

  @ViewChild(CdkPortalOutlet, { static: true })
  portalOutlet: CdkPortalOutlet;

  constructor(
    @Optional()
    private _metadataFormGroupComponent: MetadataFormGroupComponent,
    private _metadataTemplateRegistryService: MetadataTemplateRegistryService,
  ) {}

  ngOnInit() {
    this.attachComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.nodeModel &&
      !changes.nodeModel.isFirstChange() &&
      changes.nodeModel.currentValue
    ) {
      this.attachComponent();
    }
  }

  attachComponent() {
    if (this.portalOutlet.hasAttached()) {
      this.portalOutlet.detach();
    }

    const config = this._metadataTemplateRegistryService.get(
      this.nodeModel.definitionModel.templateIdentifier,
    );

    if (!config?.metadataComponent) {
      return;
    }

    this.portalOutlet.attachComponentPortal(
      new ComponentPortal(config.metadataComponent),
    );

    const componentRef = this.portalOutlet.attachedRef as ComponentRef<unknown>;

    // assign all property metadata to component instance
    merge(componentRef.instance, this.nodeModel.definitionModel);
    (componentRef.instance as PropertyMetadata).defaultValue = this.nodeModel.definitionModel.defaultValue;

    // assign node model if it has node model
    if (instanceOfHasNodeModel(componentRef.instance)) {
      componentRef.instance.nodeModel = this.nodeModel;
    }

    // trigger angular cycles
    componentRef.changeDetectorRef.detectChanges();

    // store element component ref
    this.nodeModel.state.elementComponentRef = componentRef;

    // handle component instance that has form group
    if (instanceOfHasFormGroup(componentRef.instance)) {
      // keep reference to component instance form group
      this.nodeModel.state.formGroup = componentRef.instance.formGroup;

      // add form group to parent metadata-form-group-portal
      if (this._metadataFormGroupComponent) {
        this._metadataFormGroupComponent.nodeModel.state.formGroup.addControl(
          this.nodeModel.definitionModel.propertyKey,
          componentRef.instance.formGroup,
        );
      }
    }
  }

  ngOnDestroy() {
    this.portalOutlet.dispose();
  }
}
