import {BaseController, IBaseController} from './base.controller';


export interface IUploadController extends IBaseController {

  uploadPhoto(photo: any): Promise<any>


}


export class UploadController extends BaseController implements IUploadController {

  constructor() {
    super();
  }

  uploadPhoto(photo: any): Promise<any> {
    return this.main.mongoDbController.uploadPhoto(photo);
  }
}
