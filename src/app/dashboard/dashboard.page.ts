import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConstants } from '../../../auth-constants';
import { StorageService } from './../shared/services/storage.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  items = [
    {ID:1},
    {ID:2},
    {ID:3},
    {ID:4},
    {ID:5},
    {ID:6},
  ];
  constructor(
    public router: Router,
    private storageService: StorageService,
    private _modalService: ModalService,
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(!user){
        this.router.navigate(['/login']);
      }
    });
  }
  
  openVehicleForm(): void {
    this._modalService.openVehicleForm();
  }
  
  ngOnInit() {
  }

}
