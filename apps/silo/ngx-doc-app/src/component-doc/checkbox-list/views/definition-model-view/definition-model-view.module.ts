import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxListModule, MetadataFormModule } from '@silo/ngx';
import { ExampleArticleModule } from '../../../../components/example-article/example-article.module';
import { DefinitionModelViewComponent } from './definition-model-view.component';

@NgModule({
  imports: [
    CheckboxListModule,
    CommonModule,
    ExampleArticleModule,
    FlexLayoutModule,
    MatIconModule,
    MetadataFormModule,
  ],
  declarations: [DefinitionModelViewComponent],
})
export class DefinitionModelViewModule {}
