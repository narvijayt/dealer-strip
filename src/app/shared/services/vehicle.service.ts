import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private httpService: HttpService,
  ) { }

  getVehiclesList(postData: any = ''): Observable<any> {
    console.log("Get Vehicle List ", postData);
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('vehicles?' + postData.toString());
    }else{
      return this.httpService.get('vehicles');
    }
  }

  getVehicleByID(postData: any): Observable<any> {
    return this.httpService.get('vehicles/'+postData);
  }

  insertVehicle(postData: any): Observable<any> {
    return this.httpService.post('vehicles', postData);
  }

  getVehicleDetails(postData: any = ''): Observable<any> {
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('vehicles-details?' + postData.toString());
    }
  }
  
  getUserVehicles(postData: any = ''): Observable<any> {
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('user-vehicles?' + postData.toString());
    }
  }

  // Vehicle Make API Requests
  getVehiclesMakeList(postData: any = ''): Observable<any> {
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('makes?' + postData.toString());
    }else{
      return this.httpService.get('makes');
    }
  }

  getVehiclesMakeByID(postData: any): Observable<any> {
    return this.httpService.get('makes/'+postData);
  }

  insertUserBrands(postData: any): Observable<any> {
    return this.httpService.post('brands', postData);
  }
  
  // Vehicle Models API Requests
  getVehiclesModelList(postData: any = ''): Observable<any> {
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('models?' + postData.toString() );
    }else{
      return this.httpService.get('models');
    }
  }

  getVehiclesModelByID(postData: any): Observable<any> {
    return this.httpService.get('models/'+postData);
  }

  
  /**
   * Get Vehicle Body Style Options
   * 
   * 
   */
  getVehiclesBodyStyleList(postData: any = ''): Observable<any> {
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('bodystyles?' + postData.toString() );
    }else{
      return this.httpService.get('bodystyles');
    }
  }

  getVehiclesBodyStyleByID(postData: any): Observable<any> {
    return this.httpService.get('bodystyles/'+postData);
  }

  /**
   * Get Vehicle Body Style Options
   * 
   * 
   */
   getVehiclesColorsList(postData: any = ''): Observable<any> {
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('vehicle-colors?' + postData.toString() );
    }else{
      return this.httpService.get('vehicle-colors');
    }
  }

  getVehiclesColorsByID(postData: any): Observable<any> {
    return this.httpService.get('vehicle-colors/'+postData);
  }

  /**
   * Get Vehicle Body Style Options
   * 
   * 
   */
   getVehiclesTypesList(postData: any = ''): Observable<any> {
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('vehicle-types?' + postData.toString() );
    }else{
      return this.httpService.get('vehicle-types');
    }
  }

  getVehiclesTypesByID(postData: any): Observable<any> {
    return this.httpService.get('vehicle-types/'+postData);
  }
 
  /**
   * Get Vehicle Body Style Options
   * 
   * 
   */
   getTransmissionsList(postData: any = ''): Observable<any> {
    if((postData) && (postData.toString()!='')){
      return this.httpService.get('vehicle-transmissions?' + postData.toString() );
    }else{
      return this.httpService.get('vehicle-transmissions');
    }
  }

  getTransmissionsByID(postData: any): Observable<any> {
    return this.httpService.get('vehicle-transmissions/'+postData);
  }
}
