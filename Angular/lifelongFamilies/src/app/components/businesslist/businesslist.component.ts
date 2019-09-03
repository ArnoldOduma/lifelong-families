import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Housing } from 'src/app/shared/housing';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-businesslist',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./businesslist.component.css']
})
export class BusinesslistComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  constructor(private _formBuilder: FormBuilder, public _postService: SearchService) { }

  verified = false;
  name: string;
  image: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  location: string;
  address: string;
  city: string;
  contact: string;
  description: string;

  selectedFile: File;

  createHouse() {
    const house: Housing = {
      name: this.name,
      image: this.selectedFile,
      // image: this.image,
      image1: this.image1,
      image2: this.image2,
      image3: this.image3,
      image4: this.image4,
      image5: this.image5,
      location: this.location,
      address: this.address,
      city: this.city,
      contact: this.contact,
      description: this.description,
      verified: this.verified,

    };
    // this._postService.createHouse(house)
    // .subscribe(
    //   success => alert('done'),
    //   error => alert(error)
    // );
  }



  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {

  }

    ngOnInit() {
      console.log('name' + name);
      this.formGroup1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourCtrl: ['', Validators.required],
    });
      this.formGroup2 = this._formBuilder.group({
      fiveCtrl: ['', Validators.required],
      sixCtrl: ['', Validators.required],
      sevenCtrl: ['', Validators.required],
      eightCtrl: ['', Validators.required],
    });
      this.formGroup3 = this._formBuilder.group({
      nineCtrl: ['', Validators.required],
      tenCtrl: ['', Validators.required],
    });

      this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
      this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }

}
