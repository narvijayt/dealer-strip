import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

import { AuthService } from './shared/services/auth.service';
import { AuthConstants } from '../../auth-constants';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent { 
  userData:any;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private authService: AuthService,
    private storageService: StorageService,
  ) {  
    // this.userData = this.storageService.get(AuthConstants.AUTH);
  }

}
