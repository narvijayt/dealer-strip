import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '../shared/services/modal.service';
import { AuthConstants } from '../../../auth-constants';
import { StorageService } from './../shared/services/storage.service';

import { VehicleService } from '../shared/services/vehicle.service';
import { ToastService } from '../shared/services/toast.service';
import { LoaderService } from '../shared/services/loader.service';
import { BookmarkService } from '../shared/services/bookmark.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  layoutModel = "grid";
  private vehicles:any;
  postData: any = {
    search_text: '',
    vehicle_make_id: '',
    vehicle_model_id: '',
    vehicle_make_year: ''
  };

  public vehicleMake:any;
  public vehicleModel:any;
  public user:any;
  public wishList:any;

  constructor(
    public router: Router,
    private _modalService: ModalService,
    private storageService: StorageService,
    public VehicleService: VehicleService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private bookmarkService: BookmarkService,
  ) { 
    
  }

  ionViewWillEnter(){
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

  getVehicles(){

    this.vehicles = '';
    this.loaderService.showLoader();

    let modelParams = new URLSearchParams();
    if(this.postData.search_text){
      modelParams.append('search_text', this.postData.search_text);
    }
    if(this.postData.vehicle_make_year){
      modelParams.append('vehicle_make_year', this.postData.vehicle_make_year);
    }
    if(this.postData.vehicle_make_id){
      modelParams.append('vehicle_make_id', this.postData.vehicle_make_id);
    }
    if(this.postData.vehicle_model_id){
      modelParams.append('vehicle_model_id', this.postData.vehicle_model_id);
    }
    modelParams.append('user_id', this.user.ID);
    this.VehicleService.getVehiclesList(modelParams).subscribe((result) => {
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

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.VehicleService.getVehiclesMakeList().subscribe((result) => {
      if(result.data)
        this.vehicleMake = result.data;
    })
  }

  vehicleModels(){
    this.postData.vehicle_model_id = null;
    let modelParams = new URLSearchParams();
    modelParams.append('model_make_id', this.postData.vehicle_make_id);
    this.VehicleService.getVehiclesModelList(modelParams).subscribe((result) => {
      if(result.data)
        this.vehicleModel = result.data;
    })
  }

  layoutChanged(event){    
    console.log(event.detail.value);
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

}
