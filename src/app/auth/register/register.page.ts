import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from '../../../../auth-constants';
import { AuthService } from './../../shared/services/auth.service';
import { StorageService } from './../../shared/services/storage.service';
import { ToastService } from './../../shared/services/toast.service';

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
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(user){
        this.router.navigate(['/dashboard']);
      }
    });
  }

  validateInputs() {
    console.log(this.postData);
    let business_name = this.postData.business_name.trim();
    let user_name = this.postData.user_name.trim();
    let password = this.postData.password.trim();
    let user_email = this.postData.user_email.trim();
    let user_phone = this.postData.user_phone.trim();
    let city = this.postData.city.trim();
    let state = this.postData.state.trim();
    let zipcode = this.postData.zipcode.trim();
    return (
      this.postData.business_name &&
      this.postData.user_name &&
      this.postData.password &&
      this.postData.user_email &&
      this.postData.user_phone &&
      this.postData.city &&
      this.postData.state &&
      this.postData.zipcode &&
      business_name.length > 0 &&
      user_name.length > 0 &&
      user_email.length > 0 &&
      user_phone.length > 0 &&
      city.length > 0 &&
      state.length > 0 &&
      zipcode.length > 0 &&
      password.length > 0
    );
  }
    
  signAction() {
    if (this.validateInputs()) {
      this.authService.signup(this.postData).subscribe((res: any) => {
        if (res.data) {
          // Storing the User data.
          this.storageService.store(AuthConstants.AUTH, res.data).then(res => {
            this.router.navigate(['/brands']);
          });
        } else {
          this.toastService.presentToast('Data alreay exists, please enter new details.');
        }
      },(error: any) => {
        // this.toastService.presentToast('Network Issue.');
        if(error.error){
          this.toastService.presentToast(error.error.message);
        }else{
          // this.toastService.presentToast('Network Issue.');
          this.toastService.presentToast(error.message);
        }
      });
    } else {
      this.toastService.presentToast('Please enter all values.');
    }
  }

  ngOnInit() {
  }

}
