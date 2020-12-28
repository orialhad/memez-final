import {BaseController, IBaseController} from './base.controller';


export interface IUploadController extends IBaseController {

  uploadPhoto(photo: any): Promise<any>


}


export class UploadController extends BaseController implements IUploadController {

  constructor() {
    super();
  }

  async uploadPhoto(file): Promise<any> {
    return await this.main.mongoDbController.uploadFile(file);
  }
}
