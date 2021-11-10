import { Component, OnInit, Input } from '@angular/core';

import { BookmarkService } from '../../shared/services/bookmark.service';
import { StorageService } from '../../shared/services/storage.service';
import { ToastService } from '../../shared/services/toast.service';
import { AuthConstants } from '../../../../auth-constants';

@Component({
  selector: 'app-product-grid-view',
  templateUrl: './product-grid-view.component.html',
  styleUrls: ['./product-grid-view.component.scss'],
})
export class ProductGridViewComponent implements OnInit {

  @Input() vehicle;
  @Input() addedToBookMark: boolean;
  @Input() showBookmarkIcon: boolean;

  private user;

  constructor(
    private storageService: StorageService,
    private toastService: ToastService,
    private bookmarkService: BookmarkService,
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(user){
        this.user = user;
      }
    });
  }

  ngOnInit() {
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

}
