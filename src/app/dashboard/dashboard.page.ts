import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public Router: Router,
    private _modalService: ModalService
  ) { }
  
  openVehicleForm(): void {
    this._modalService.openVehicleForm();
  }
  
  ngOnInit() {
  }

}
