import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from '../../../auth-constants';
import { StorageService } from './../shared/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private storageService: StorageService,
    public router: Router,
  ) {
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(user){
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
