import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';

export interface DialogData {
  newFile: File;
}

@Component({
  selector   : 'mem-upload',
  templateUrl: './upload.component.html',
  styleUrls  : ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  newFile;
  @Output() uploadedFiles = new EventEmitter();

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};


  constructor() {
  }

  onSelect(file) {
    this.newFile = file.target.files[0];
  }

  onUpload() {
    // const  blob  = base64ToFile(this.croppedImage);
    this.newFile = this.ToFile(this.croppedImage)
    this.uploadedFiles.emit(this.newFile);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  // public blobToFile = (theBlob: Blob): File => {
  //   const b: any           = theBlob,
  //         filename: string = this.imageChangedEvent.target.files[0].name
  //
  //   //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //   b.lastModifiedDate = new Date();
  //   b.name = filename;
  //   b.filename = filename
  //
  //   //Cast to a File() type
  //   return  <File> theBlob;
  //
  //
  // }

  ToFile(data) {
    const filename: string = this.imageChangedEvent.target.files[0].name
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }



  ngOnInit(): void {
  }

}
