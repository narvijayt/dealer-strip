import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NavController } from '@ionic/angular';

import { ModalService } from '../../shared/services/modal.service';
import { VehicleService } from '../../shared/services/vehicle.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {
  ID:any;
  vehicle:any;
  constructor(
    private route : ActivatedRoute, 
    private router : Router,
    private navCtrl: NavController,
    private _modalService: ModalService,
    public VehicleService: VehicleService,
    private toastService: ToastService
  ) { }
  
  ionViewWillEnter(){
    this.ID = '';
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
    });

    this.getVehicleDetails();
  }

  getVehicleDetails(){
    this.VehicleService.getVehicleByID(this.ID).subscribe((result) => {
      if(result.data){
        this.vehicle = result.data;
        // console.log(this.vehicle);
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
