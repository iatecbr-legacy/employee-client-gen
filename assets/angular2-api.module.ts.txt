import { NgModule } from '@angular/core';
import { HttpModule, Http, XSRFStrategy, Request } from '@angular/http';

import { APIS } from './api/api';

@NgModule({
  declarations: [ ],
  imports: [
    HttpModule,
  ],
  providers: [
      APIS,
      { provide: XSRFStrategy, useFactory: () => new NoXSRFStrategy() }
  ],
  bootstrap: [ ]
})
export class ApiModule { }
class NoXSRFStrategy extends XSRFStrategy {
  configureRequest(req: Request): void {}
}