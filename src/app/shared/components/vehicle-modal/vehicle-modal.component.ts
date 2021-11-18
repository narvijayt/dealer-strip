import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { AuthConstants } from '../../../../../auth-constants';
import { StorageService } from '../../../shared/services/storage.service';
import { ToastService } from '../../../shared/services/toast.service';
import { LoaderService } from '../../../shared/services/loader.service';

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

  private listingTypes: any = ['Viso','Hand Holding','Gotta Go'];
  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;

  postData: any = {
    user_id: '',
    vehicle_make_id: '',
    vehicle_model_id: '',
    vehicle_make_year: '',
    vehicle_mileage: '',
    vehicle_bodystyle_id: '',
    exterior_color_id: '',
    interior_color_id: '',
    vehicle_type_id: '',
    vehicle_list_type: '',
    vehicle_trim: '',
    vehicle_transmission_id: '',
    vehicle_keys: '',
    retail_price: '',
    vehicle_toolkit:'',
    vehicle_damaged: '',
    call_for_price: '',
    vehicle_owner_manual: '',
    vehicle_vin: '',
    vehicleImage:'',
    vehicle_travelled:'',
    vehicle_location:'',
  };
  public toolkit_flag:boolean;
  public damaged_flag:boolean;
  public call_flag:boolean;
  public manual_flag:boolean;

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
    private toastService: ToastService,
    private camera: Camera,
    private file: File,
    private crop: Crop,
    private loaderService: LoaderService,
    ) {
      this.storageService.get(AuthConstants.AUTH).then( user => {
        if(!user){
          this.router.navigate(['/login']);
        }else{
          this.postData.user_id = user.ID;
        }
      });
      this.toolkit_flag = false;
      this.damaged_flag = false;
      this.call_flag = false;
      this.manual_flag = false;
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
    });
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

  toggleOption(toggleType){
    if(toggleType == "toolkit_flag"){
      this.toolkit_flag;
      // console.log("toolkit_flag Toggle ", this.toolkit_flag);
    }else if(toggleType == "damaged_flag"){
      this.damaged_flag;
      // console.log("damaged_flag Toggle ", this.damaged_flag);
    }else if(toggleType == "call_flag"){
      this.call_flag;
      // console.log("call_flag Toggle ", this.call_flag);
    }else if(toggleType == "manual_flag"){
      this.manual_flag;
      // console.log("manual_flag Toggle ", this.manual_flag);
    }
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
      this.loaderService.showLoader();
      // console.log(this.toolkit_flag);
      this.postData.vehicle_toolkit = (this.toolkit_flag === false) ? 0 : 1;
      this.postData.vehicle_damaged = (this.damaged_flag === false) ? 0 : 1;
      this.postData.call_for_price = (this.call_flag === false) ? 0 : 1;
      this.postData.vehicle_owner_manual = (this.manual_flag === false) ? 0 : 1;
      console.log(this.postData);
      
      this.VehicleService.insertVehicle(this.postData).subscribe((result) => {
        // console.log(result);
        if(result.data){          
          this.dismiss();
          this.navCtrl.navigateRoot('/car-details/'+result.data, {
            animated: true,
            animationDirection: 'forward',
          });
        }else{
          this.toastService.presentToast(result.message);
        }
        this.loaderService.dismissLoader();        
      },(error: any) => {
        if(error.error){
          this.toastService.presentToast(error.error.message);
        }else{
          this.toastService.presentToast(error.message);
        }
        this.loaderService.dismissLoader();
      });
    }  else {
      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  async chooseImage(sourceType) {    
    try {

      if(sourceType == 1){
        const options: CameraOptions = {
          quality: 75,
          sourceType: sourceType,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
        }
  
        this.camera.getPicture(options).then((imageURL) => {
          this.cropImage(imageURL);
        }, (err) => {
          // Handle error
          console.warn(err);
        });
      }else{
        const options: CameraOptions = {
          quality: 100,
          sourceType: sourceType,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
        }
  
        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          this.postData.vehicleImage = imageData;
          this.imagePath = 'data:image/jpeg;base64,' + this.postData.vehicleImage;
        }, (err) => {
          // Handle error
          console.warn(err);
        });
      }

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
          this.chooseImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Camera',
        handler: () => {
          this.chooseImage(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });

    return await actionSheet.present();
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 100, targetWidth: 1200, targetHeight: 1200 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.postData.vehicleImage = base64.replace("data:image/jpeg;base64,", "");
      console.log("Image Store Path ", this.postData.vehicleImage);
      this.imagePath = base64;
    }, error => {
      console.warn('Error in showing image' + error);
    });
  }

  
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
