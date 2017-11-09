import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';

import { APIS } from './api/api';

@NgModule({
  declarations: [ ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [ APIS ],
  bootstrap: [ ]
})
export class ApiModule { }
