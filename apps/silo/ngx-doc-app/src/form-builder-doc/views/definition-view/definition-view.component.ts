import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AddFormElementEvent,
  FormBuilderComponent,
  FormBuilderEvent,
  FormBuilderService,
  FormDefinitionModel,
  ImportFormEvent,
  RemoveFormElementEvent,
  UpdateFormElementDefinitionEvent,
} from '@silo/ngx';

@Component({
  selector: 'silo-definition-view',
  templateUrl: './definition-view.component.html',
  styleUrls: ['./definition-view.component.scss'],
})
export class DefinitionViewComponent implements OnInit {
  formDefinitionModel: FormDefinitionModel;
  memberKeyList: Array<string>;

  @ViewChild(FormBuilderComponent, { static: true })
  formBuilderComponent: FormBuilderComponent;

  constructor(private _formBuilderService: FormBuilderService) {}

  ngOnInit() {
    this.setFormDefinition();
  }

  setFormDefinition() {
    this.formDefinitionModel = this._formBuilderService.createFormDefinition();
    this.setMemberKeyList();
  }

  setMemberKeyList(): void {
    this.memberKeyList = this.formDefinitionModel.rootMemberKey
      ? [this.formDefinitionModel.rootMemberKey]
      : [];
  }

  handleEvent($event: FormBuilderEvent) {
    if ($event instanceof ImportFormEvent) {
      if ($event.formDefinitionJson) {
        this.formDefinitionModel = JSON.parse($event.formDefinitionJson);
      }
      this.setMemberKeyList();
      this.formBuilderComponent.render(
        this.formDefinitionModel,
        this.memberKeyList,
      );
      return;
    }

    if ($event instanceof AddFormElementEvent) {
      const { definitionModel } = this._formBuilderService.addElement(
        this.formDefinitionModel,
        $event.templateIdentifier,
        $event.templateDisplayName,
        $event.parentMemberKey,
      );
      this.formBuilderComponent.lastActiveDefinitionKey$.next(
        definitionModel.key,
      );
      this.setMemberKeyList();
      this.formBuilderComponent.render(
        this.formDefinitionModel,
        this.memberKeyList,
      );
      return;
    }

    if ($event instanceof RemoveFormElementEvent) {
      this._formBuilderService.removeElement(
        this.formDefinitionModel,
        $event.memberKey,
      );
      this.setMemberKeyList();
      this.formBuilderComponent.render(
        this.formDefinitionModel,
        this.memberKeyList,
      );
      return;
    }

    if ($event instanceof UpdateFormElementDefinitionEvent) {
      this._formBuilderService.updateElementDefinition(
        this.formDefinitionModel,
        $event.formElementDefinitionModel,
      );
      return;
    }
  }
}
