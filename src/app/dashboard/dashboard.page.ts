import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from '../../../auth-constants';
import { StorageService } from './../shared/services/storage.service';
import { ModalService } from '../shared/services/modal.service';
import { VehicleService } from '../shared/services/vehicle.service';
import { ToastService } from '../shared/services/toast.service';
import { LoaderService } from '../shared/services/loader.service';
import { BookmarkService } from '../shared/services/bookmark.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private vehicles:any;
  private user:any;
  public wishList:any;

  constructor(
    public router: Router,
    private storageService: StorageService,
    private _modalService: ModalService,
    public VehicleService: VehicleService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private bookmarkService: BookmarkService,
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(!user){
        this.router.navigate(['/login']);
      }else{
        this.user = user;
        this.getVehicles();
        this.loadWishList();
      }
    });
  }

  ionViewWillEnter(){
    // this.getVehicles();
  }
  
  getVehicles(){
    this.loaderService.showLoader();
    this.VehicleService.getVehiclesList().subscribe((result) => {
      if(result.data){
        this.vehicles = result.data;
        // console.log(this.vehicles);
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

  openVehicleForm(): void {
    this._modalService.openVehicleForm();
  }

  addToBookmark(vehicle_id){
    var postData = {
      user_id : this.user.ID,
      item_id : vehicle_id
    }
    this.bookmarkService.addToBookmark(postData).subscribe((response) =>{
      console.log(" response of API ", response);
    });
  }

  loadWishList(){
    let modelParams = new URLSearchParams();
    modelParams.append('user_id', this.user.ID);
    this.bookmarkService.getBookmark(modelParams).subscribe( result =>{
      if(result.data){
        this.wishList = result.data;
      }
    })
  }
  
  ngOnInit() {
  }

}
