import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from '../../../../auth-constants';
import { AuthService } from './../../shared/services/auth.service';
import { StorageService } from './../../shared/services/storage.service';
import { ToastService } from './../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  postData = {
    username: '',
    password: ''
  };

  constructor(
    public router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(user){
        this.router.navigate(['/dashboard']);
      }
    });
  }

  validateInputs() {
    console.log(this.postData);
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
    if (this.validateInputs()) {
      this.authService.login(this.postData).subscribe((res: any) => {
        if (res.data) {
          // Storing the User data.
          this.storageService.store(AuthConstants.AUTH, res.data);
          this.router.navigate(['/dashboard']);
        } else {
          // this.toastService.presentToast('Incorrect username and password.');
          this.toastService.presentToast(res.message);
        }
      },(error: any) => {
          if(error.error){
            this.toastService.presentToast(error.error.message);
          }else{
            // this.toastService.presentToast('Network Issue.');
            this.toastService.presentToast(error.message);
          }
        }
      );
    } else {
      this.toastService.presentToast('Please enter username or password.');
    }
  }

  ngOnInit() {
  }

}
