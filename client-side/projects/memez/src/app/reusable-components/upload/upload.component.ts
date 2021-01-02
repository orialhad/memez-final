import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  newFile: File;
}

@Component({
  selector   : 'mem-upload',
  templateUrl: './upload.component.html',
  styleUrls  : ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  newFile: File;
  @Output() uploadedFiles = new EventEmitter();




  constructor() {
  }

  onSelect(file) {
    this.newFile = file.target.files[0];
  }

  onUpload() {
    this.uploadedFiles.emit(this.newFile);
  }


  ngOnInit(): void {
  }

}
