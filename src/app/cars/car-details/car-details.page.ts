import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NavController } from '@ionic/angular';

import { AuthConstants } from '../../../../auth-constants';
import { ModalService } from '../../shared/services/modal.service';
import { VehicleService } from '../../shared/services/vehicle.service';
import { ToastService } from '../../shared/services/toast.service';
import { LoaderService } from '../../shared/services/loader.service';
import { StorageService } from '../../shared/services/storage.service';
import { BookmarkService } from '../../shared/services/bookmark.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {
  ID:any;
  vehicle:any;
  user:any;
  vehicleImage: any;
  addedToBookMark: boolean;
  wishList: any;

  constructor(
    private route : ActivatedRoute, 
    private router : Router,
    private navCtrl: NavController,
    private _modalService: ModalService,
    public VehicleService: VehicleService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private storageService: StorageService,
    private bookmarkService: BookmarkService,
  ) { }
  
  ionViewWillEnter(){
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(!user){
        this.router.navigate(['/login']);
      }else{
        this.user = user;
      }
    });

    this.ID = '';
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
    });

    this.getVehicleDetails();
  }

  getVehicleDetails(){
    this.loaderService.showLoader();
    this.VehicleService.getVehicleByID(this.ID).subscribe((result) => {
      if(result.data){
        this.vehicle = result.data;
        this.vehicleImage = (this.vehicle.vehicle_image) ? 'data:image/jpeg;base64,' + this.vehicle.vehicle_image : '';
        // console.log(this.vehicleImage);
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

  loadWishList(){
    let modelParams = new URLSearchParams();
    modelParams.append('user_id', this.user.ID);
    this.bookmarkService.getBookmark(modelParams).subscribe( result =>{
      if(result.data){
        this.wishList = result.data;
        if(this.wishList.indexOf(this.vehicle.vehicle_id) >= 0){
          this.addedToBookMark = true;
        }
      }
    })
  }

  handleAddToBookmark(){
    var postData = {
      item_id : this.vehicle.vehicle_id,
      user_id : this.user.ID
    }
    this.bookmarkService.addToBookmark(postData).subscribe((result) => {
      if(result.data){
        this.addedToBookMark = true;
      }else{
        this.toastService.presentToast(result.message);
      }
    },(error: any) => {
      if(error.error){
        this.toastService.presentToast(error.error.message);
      }else{
        // this.toastService.presentToast('Network Issue.');
        this.toastService.presentToast(error.message);
      }
    });
  }

  handleRemoveFromBookmark(){
    let modelParams = new URLSearchParams();
    modelParams.append('user_id', this.user.ID);
    modelParams.append('item_id', this.vehicle.vehicle_id);
    this.bookmarkService.removeFromBookmark(modelParams).subscribe((result) => {
      if(result.data){
        this.addedToBookMark = false;
      }else{
        this.toastService.presentToast(result.message);
      }
    },(error: any) => {
      if(error.error){
        this.toastService.presentToast(error.error.message);
      }else{
        // this.toastService.presentToast('Network Issue.');
        this.toastService.presentToast(error.message);
      }
    });
  }

  backRedirect(){
    this.navCtrl.back();
  }

  openVehicleForm(): void {
    this._modalService.openVehicleForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
   });
  }

}
