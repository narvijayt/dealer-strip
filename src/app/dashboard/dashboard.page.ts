import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from '../../../auth-constants';
import { StorageService } from './../shared/services/storage.service';
import { ModalService } from '../shared/services/modal.service';
import { VehicleService } from '../shared/services/vehicle.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private vehicles:any;

  constructor(
    public router: Router,
    private storageService: StorageService,
    private _modalService: ModalService,
    public VehicleService: VehicleService,
    private toastService: ToastService
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(!user){
        this.router.navigate(['/login']);
      }
    });
  }

  ionViewWillEnter(){
    this.getVehicles();
  }
  
  getVehicles(){
    this.VehicleService.getVehiclesList().subscribe((result) => {
      if(result.data){
        this.vehicles = result.data;
        // console.log(this.vehicles);
      }else{
        this.toastService.presentToast(result.message);
      }
    },(error: any) => {
      if(error.error){
        this.toastService.presentToast(error.error.message);
      }else{
        this.toastService.presentToast(error.message);
      }
    });
  }

  openVehicleForm(): void {
    this._modalService.openVehicleForm();
  }
  
  ngOnInit() {
  }

}
