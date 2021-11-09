import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StorageService } from './storage.service';
import { AuthConstants } from '../../../../auth-constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: any;
  user_id: any;

  constructor(
    private storageService: StorageService,
    private httpService: HttpService,
  ) {
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(user){
        this.user_id = user.ID;
      }
    });
  }

  getBookmark(modelParams: any): Observable<any> {
    if((modelParams) && (modelParams.toString()!='')){
      return this.httpService.get('wishlist?' + modelParams.toString());
    }else{
      return this.httpService.get('wishlist');
    }
  }
  
  addToBookmark(postData: any): Observable<any> {
    return this.httpService.post('/wishlist', postData);
  }

  removeFromBookmark(modelParams: any): Observable<any> {
    return this.httpService.delete('wishlist?' + modelParams.toString());
  }
}
