import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { APIS } from './api/api';

@NgModule({
  declarations: [ ],
  imports: [
    HttpModule,
  ],
  providers: [ APIS ],
  bootstrap: [ ]
})
export class ApiModule { }
