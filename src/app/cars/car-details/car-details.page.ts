import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {
  ID:any;
  constructor(
    private route : ActivatedRoute, 
    private router : Router,
    private navCtrl: NavController,
    private _modalService: ModalService
  ) { }
  
  ionViewWillEnter(){
    this.ID = '';
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
    });

    this.getProductDetails();
  }

  getProductDetails(){
    
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
