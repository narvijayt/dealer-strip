import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
// const { Camera } = Plugins;

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss'],
})
export class VehicleModalComponent implements OnInit {

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('basicInformationFormRef', { static: false }) basicInformationFormRef: NgForm;
  @ViewChild('engineFormRef', { static: false }) engineFormRef: NgForm;
  @ViewChild('pricingFormRef', { static: false }) pricingFormRef: NgForm;

  public order: any = {
    id: 1,
    items: [{
      id: 1,
      name: 'Denim T-Shirt',
      amount: 15.00,
    }, {
      id: 1,
      name: 'Denim Pants',
      amount: 5.00,
    }, {
      id: 1,
      name: 'Black T-Shirt',
      amount: 5.00,
    }],
    subtotal: 25.00,
    shippingFee: 5.00,
    total: 30.00, 
  };

  public basicInformationForm: FormGroup;
  public pricingForm: FormGroup;
  public engineForm: FormGroup;

  public imagePath: SafeResourceUrl;


  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;

  get basicVehicleMake(): AbstractControl {
    return this.basicInformationForm.get('vehicle_make');
  }

  get basicVehicleModel(): AbstractControl {
    return this.basicInformationForm.get('vehicle_model');
  }

  get vehicleYear(): AbstractControl {
    return this.basicInformationForm.get('vehicle_year');
  }

  get vehicleMileage(): AbstractControl {
    return this.basicInformationForm.get('mileage');
  }

  get vehicleBodyStyle(): AbstractControl {
    return this.basicInformationForm.get('bodyStyle');
  }

  /*get billingState(): AbstractControl {
    return this.basicInformationForm.get('state');
  }

  get billingZip(): AbstractControl {
    return this.basicInformationForm.get('zip');
  }

  get billingCountryCode(): AbstractControl {
    return this.basicInformationForm.get('country_code');
  }*/

  get engineExteriorColor(): AbstractControl {
    return this.engineForm.get('exterior_color');
  }
  
  get engineInteriorColor(): AbstractControl {
    return this.engineForm.get('interior_color');
  }

  get engineCylinder(): AbstractControl {
    return this.engineForm.get('vehicle_cylinder');
  }

  get engineTransmission(): AbstractControl {
    return this.engineForm.get('transmission');
  }
  
  get engineVehicleKeys(): AbstractControl {
    return this.engineForm.get('vehicle_keys');
  }

  get priceRetailPrice(): AbstractControl {
    return this.pricingForm.get('retail_price');
  }

  constructor(private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    public modalController : ModalController
    ) {
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
    this.basicInformationForm = new FormGroup({
      vehicle_make: new FormControl('2021', Validators.required),
      vehicle_model: new FormControl('2020', Validators.required),
      vehicle_year: new FormControl('2019', Validators.required),
      mileage: new FormControl('20', Validators.required),
      bodyStyle: new FormControl('Sedan', Validators.required),
    });

    this.engineForm = new FormGroup({
      exterior_color: new FormControl('Black', Validators.required),
      interior_color: new FormControl('White', Validators.required),
      vehicle_cylinder: new FormControl('V6', Validators.required),
      transmission: new FormControl('Automatic', Validators.required),
      vehicle_keys: new FormControl('2', Validators.required),
    });

    this.pricingForm = new FormGroup({
      retail_price: new FormControl('', Validators.required),
      toolkit:  new FormControl(''),
      damaged_vehicle:  new FormControl(''),
      price_call:  new FormControl(''),
      owner_manual:  new FormControl(''),
    });
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

      this.basicInformationFormRef.onSubmit(undefined);

      if (this.basicInformationForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Engine, Interior & Exterior') {
      
      this.engineFormRef.onSubmit(undefined);

      if (this.engineForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Pricing & Other Info') {

      this.pricingFormRef.onSubmit(undefined);

      if (this.pricingForm.valid) {
        this.dismiss();
        this.navCtrl.navigateRoot('profile', {
          animated: true,
          animationDirection: 'forward',
        });
      }

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

  /*async chooseImage(source: CameraSource) {

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
