import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
// const { Camera } = Plugins;

import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { AuthConstants } from '../../../../../auth-constants';
import { StorageService } from '../../../shared/services/storage.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss'],
})
export class VehicleModalComponent implements OnInit {

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;

  public imagePath: SafeResourceUrl;
  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;

  postData = {
    user_id: '',
    vehicle_make_id: '',
    vehicle_model_id: '',
    vehicle_make_year: '',
    vehicle_mileage: '',
    vehicle_bodystyle_id: '',
    exterior_color_id: '',
    interior_color_id: '',
    vehicle_type_id: '',
    vehicle_transmission_id: '',
    vehicle_keys: '',
    retail_price: '',
    vehicle_toolkit:'',
    vehicle_damaged: '',
    call_for_price: '',
    vehicle_owner_manual: '',
    vehicle_vin: '',
  };
  public vehicleMake:any;
  public vehicleModel:any;
  public bodyStyles:any;
  public interiorColors:any;
  public exteriorColors:any;
  public vehicleTypes:any;
  public transmissions:any;

  constructor(
    public router: Router,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    public modalController : ModalController,
    public VehicleService: VehicleService,
    private storageService: StorageService,
    private toastService: ToastService
    ) {
      this.storageService.get(AuthConstants.AUTH).then( user => {
        if(!user){
          this.router.navigate(['/login']);
        }else{
          this.postData.user_id = user.ID;
        }
      });
  }

  ngOnInit() {
    this.setupForm();
    this.buildSlides();
  }

  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
  }

  buildSlides() {
    const slides = ['Vehicle Information', 'Engine, Interior & Exterior', 'Pricing & Other Info'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  setupForm() {
    this.VehicleService.getVehiclesMakeList().subscribe((result) => {
      if(result.data)
        this.vehicleMake = result.data;
    })

    this.VehicleService.getVehiclesBodyStyleList().subscribe((result) => {
      if(result.data)
        this.bodyStyles = result.data;
    })

    let exteriorParams = new URLSearchParams();
    exteriorParams.append('color_type', 'Exterior');
    this.VehicleService.getVehiclesColorsList(exteriorParams).subscribe((result) => {
      if(result.data)
        this.exteriorColors = result.data;
    })

    let interiorParams = new URLSearchParams();
    interiorParams.append('color_type', 'Interior');
    this.VehicleService.getVehiclesColorsList(interiorParams).subscribe((result) => {
      if(result.data)
        this.interiorColors = result.data;
    })
    
    this.VehicleService.getVehiclesTypesList().subscribe((result) => {
      if(result.data)
        this.vehicleTypes = result.data;
    })
    
    this.VehicleService.getTransmissionsList().subscribe((result) => {
      if(result.data)
        this.transmissions = result.data;
    })
  }

  vehicleModels(){
    this.postData.vehicle_model_id = null;
    let modelParams = new URLSearchParams();
    modelParams.append('model_make_id', this.postData.vehicle_make_id);
    this.VehicleService.getVehiclesModelList(modelParams).subscribe((result) => {
      if(result.data)
        this.vehicleModel = result.data;
    })
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  onNextButtonTouched() {
    
    if (this.currentSlide === 'Vehicle Information') {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
    } else if (this.currentSlide === 'Engine, Interior & Exterior') {      
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
    } else if (this.currentSlide === 'Pricing & Other Info') {
      console.log(this.postData);
      /*this.VehicleService.insertVehicle(this.postData).subscribe((result) => {
        console.log(result);
        if(result.data){          
          this.dismiss();
          this.navCtrl.navigateRoot('/car-details/'+result.data, {
            animated: true,
            animationDirection: 'forward',
          });
        }else{
          this.toastService.presentToast(result.message);
        }          
      },(error: any) => {
        if(error.error){
          this.toastService.presentToast(error.error.message);
        }else{
          this.toastService.presentToast(error.message);
        }
      });*/
    }  else {

      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

  /*convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  async chooseImage(source: CameraSource) {

    try {

      const image = await Camera.getPhoto({
        quality: 70,
        width: 600,
        height: 600,
        preserveAspectRatio: true,
        allowEditing: true,
        correctOrientation: true,
        source: source,
        resultType: CameraResultType.Uri,
      });

      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
      this.imagePath = safeUrl;

      const response = await fetch(image.webPath);
      const blob = await response.blob();

      const base64 = await this.convertBlobToBase64(blob) as string;

      // Send encoded string to server...

    } catch (error) {
      console.warn(error);
    }

  }

  async presentActionSheet() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose an option',
      buttons: [{
        text: 'Photo Library',
        handler: () => {
          this.chooseImage(CameraSource.Photos);
        }
      }, {
        text: 'Camera',
        handler: () => {
          this.chooseImage(CameraSource.Camera);
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });

    return await actionSheet.present();
  }*/
  
  originalOrder = (): number => {
    return 0;
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
