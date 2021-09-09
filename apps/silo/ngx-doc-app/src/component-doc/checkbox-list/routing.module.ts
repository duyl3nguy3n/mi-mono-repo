import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavListItemModel, RouterTabLayoutComponent } from '@silo/ngx';
import { DefinitionModelViewComponent } from './views/definition-model-view/definition-model-view.component';
import { DefinitionModelViewModule } from './views/definition-model-view/definition-model-view.module';
import { ExampleViewComponent } from './views/example-view/example-view.component';
import { ExampleViewModule } from './views/example-view/example-view.module';

const routes: Routes = [
  {
    path: '',
    component: RouterTabLayoutComponent,
    data: {
      navList: [
        { label: 'Examples', routerLink: 'example' },
        { label: 'Definition Model', routerLink: 'definition-model' },
      ] as Array<NavListItemModel>,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'example',
      },
      {
        path: 'example',
        component: ExampleViewComponent,
      },
      {
        path: 'definition-model',
        component: DefinitionModelViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    DefinitionModelViewModule,
    ExampleViewModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
