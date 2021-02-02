import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CropperComponent, ImageCropperResult}               from 'angular-cropperjs';
import {DomSanitizer}                                       from '@angular/platform-browser';

export interface DialogData {
  newFile: File;
}

@Component({
  selector   : 'mem-upload',
  templateUrl: './upload.component.html',
  styleUrls  : ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  newFile: File;
  blobFile: any;
  @Output() uploadedFiles = new EventEmitter();

  config           = {preview:'.preview'};
  imageUrl: string;
  resultImage: File;
  result: any;
  cropped: boolean = false;


  constructor(
    private sanitizer: DomSanitizer
  ) {
    window['Upload1'] = this;
  }

  onSelect(file) {
    this.newFile = file.target.files[0];
    if (
      this.newFile.type === 'image/png'
      || this.newFile.type === 'image/jpeg'
      || this.newFile.type === 'image/gif'
    ) {
      this.toUrl();
    } else {
      this.newFile = undefined;
      alert(`ONLY PICTURES PLEASE!!!`);
    }

  }

  onUpload() {
    //check if file exist
    if (this.newFile) {
      //check if file gif
      if (this.newFile.type === 'image/gif' || this.result === undefined) {
        this.resultImage = this.newFile;
        this.uploadedFiles.emit(this.resultImage);
      } else {
        if (this.newFile.type === 'image/png' || 'image/jpg') {
          this.resultImage = this.toFile(this.result, this.newFile.name);
          this.uploadedFiles.emit(this.resultImage);
        }
      }
    } else {
      alert(`You can't do that`);
    }
  }

  cropMe() {
    this.result = this.angularCropper.imageUrl;
    this.angularCropper.exportCanvas();
    this.cropped = true;
  }

  resultImageFun(event: ImageCropperResult) {
    this.result = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/png');

  }


  toFile(data, filename) {
    const
      arr     = data.split(','),
      mime    = arr[0].match(/:(.*?);/)[1],
      bstr    = atob(arr[1]);
    let n     = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }


  toUrl() {
    if (this.newFile === undefined) {
      return;
    }else {
      let newBlob    = new Blob([this.newFile], {type: this.newFile.type});
      let urlCreator = window.URL;
      this.blobFile  = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(newBlob).toString());
      this.imageUrl  = this.blobFile;
    }
  }

  ngOnInit(): void {
  }

}
