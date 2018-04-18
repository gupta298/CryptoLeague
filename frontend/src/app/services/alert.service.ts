import { Injectable } from '@angular/core';

declare var UIkit: any;

@Injectable()
export class AlertService {

  constructor() {
     
  }

  success(message: string) {
      UIkit.notification({
          message: message,
          status: 'success',
          pos: 'bottom-center',
      });
  }

  error(message: string) {
      UIkit.notification({
          message: message,
          status: 'danger',
          pos: 'bottom-center',
      });
  }
}
