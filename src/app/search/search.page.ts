import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '../shared/services/modal.service';
import { AuthConstants } from '../../../auth-constants';
import { StorageService } from './../shared/services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

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
    private _modalService: ModalService,
    private storageService: StorageService,
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
