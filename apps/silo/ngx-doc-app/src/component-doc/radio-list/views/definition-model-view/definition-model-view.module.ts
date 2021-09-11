import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MetadataFormModule, RadioListModule } from '@silo/ngx';
import { ExampleArticleModule } from '../../../../components/example-article/example-article.module';
import { DefinitionModelViewComponent } from './definition-model-view.component';

@NgModule({
  imports: [
    CommonModule,
    ExampleArticleModule,
    FlexLayoutModule,
    MatIconModule,
    MetadataFormModule,
    RadioListModule,
  ],
  declarations: [DefinitionModelViewComponent],
})
export class DefinitionModelViewModule {}
