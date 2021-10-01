import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private platform: Platform,
    public Router: Router,
    public navCtrl: NavController
  ) { }

  openRequestedPage(pageLink){
    this.navCtrl.navigateForward(pageLink);
  }

  doLogin(form){
    console.log("Clicked");
    let formData = {"username":form.value.username, "password":form.value.password};
    if(form.value.username == "user" && form.value.password == "password"){
      localStorage.setItem('userData', JSON.stringify(formData) );
      this.Router.navigate(['dashboard']);
    }    
  }

  ngOnInit() {
  }

}
