import { Component, OnInit } from '@angular/core';
import { LookupConfigModel } from '@silo/ngx';

@Component({
  selector: 'silo-example-view',
  templateUrl: './example-view.component.html',
  styleUrls: ['./example-view.component.scss'],
})
export class ExampleViewComponent implements OnInit {
  lookupConfig: LookupConfigModel = {
    lookups: [
      { key: '1', displayName: 'Laptop' },
      { key: '2', displayName: 'Phone' },
      { key: '3', displayName: 'Tablet' },
    ],
  };

  constructor() {}

  ngOnInit() {}
}
