import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthConstants } from '../../../../auth-constants';
import { StorageService } from '../../shared/services/storage.service';
import { VehicleService } from '../../shared/services/vehicle.service';
import { ToastService } from '../../shared/services/toast.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {

  private brands: any;
  private user: any;
  private selectedArray :any = [];
  private postData: any = {
    brands:[],
    user_id:''
  }

  constructor(
    public navCtrl: NavController,
    public router: Router,
    private storageService: StorageService,
    public VehicleService: VehicleService,
    private toastService: ToastService,
    private loaderService: LoaderService,
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(!user){
        this.router.navigate(['/register']);
      }else{
        this.user = user;
        this.postData.user_id = this.user.ID;
        this.setupForm();
      }
    });
  }

  saveBrandChoices(){
    this.loaderService.showLoader();
    this.postData.brands = this.selectedArray;
    this.VehicleService.insertUserBrands(this.postData).subscribe((result) => {
      if(result.data){
        this.navCtrl.navigateRoot('/dashboard', {
          animated: true,
          animationDirection: 'forward',
        });
      }else{
        this.toastService.presentToast(result.message);
      }
      this.loaderService.dismissLoader();
    },(error: any) => {
      if(error.error){
        this.toastService.presentToast(error.error.message);
      }else{
        this.toastService.presentToast(error.message);
      }
      this.loaderService.dismissLoader();
    });
  }

  ngOnInit() {
  }

  setupForm() {
    this.VehicleService.getVehiclesMakeList().subscribe((result) => {
      if(result.data)
        this.brands = result.data;
        for(var index=0;index<this.brands.length;index++){
          this.brands[index].checked = false;
        }
    })
  }

  selectMember(data){
    if (data.checked == false) {
       this.selectedArray.push(data.make_id);
     } else {
      let newArray = this.selectedArray.filter(function(el) {
        return el !== data.make_id;
      });
      this.selectedArray = newArray;
    }
    console.log(this.selectedArray);
  }

  openRequestedPage(pageLink){
    this.navCtrl.navigateForward(pageLink);
  }

}
