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
      { key: 'Y', displayName: 'Yes' },
      { key: 'N', displayName: 'No' },
    ],
  };

  constructor() {}

  ngOnInit() {}
}
