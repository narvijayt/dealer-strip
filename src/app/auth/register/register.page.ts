import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from '../../../../auth-constants';
import { AuthService } from './../../shared/services/auth.service';
import { StorageService } from './../../shared/services/storage.service';
import { ToastService } from './../../shared/services/toast.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  postData = {
    business_name: '',
    user_name: '',
    user_email: '',
    user_phone: '',
    city: '',
    state: '',
    zipcode: '',
    password: ''
  };

  constructor(
    public router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private loaderService: LoaderService,
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(user){
        this.router.navigate(['/dashboard']);
      }
    });
  }
    
  signAction() {    
    this.loaderService.showLoader();
    this.authService.signup(this.postData).subscribe((res: any) => {
      this.loaderService.dismissLoader();
      if (res.data) {
        // Storing the User data.
        this.storageService.store(AuthConstants.AUTH, res.data).then(res => {
          this.router.navigate(['/brands']);
        });
      } else {
        this.toastService.presentToast('Something went wrong, please try again Later!');
      }
    },(error: any) => {
      this.loaderService.dismissLoader();
      // this.toastService.presentToast('Network Issue.');
      if(error.error){
        this.toastService.presentToast(error.error.message);
      }else{
        // this.toastService.presentToast('Network Issue.');
        this.toastService.presentToast(error.message);
      }
    });
  }

  ngOnInit() {
  }

}
