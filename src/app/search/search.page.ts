import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';

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
    private _modalService: ModalService
  ) { }

  openVehicleForm(): void {
    this._modalService.openVehicleForm();
  }

  ngOnInit() {
  }

}
