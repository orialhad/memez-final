import {BaseController, IBaseController} from './base.controller';


export interface IUploadController extends IBaseController {

  uploadFile(photo: any): Promise<any>


}


export class UploadController extends BaseController implements IUploadController {

  constructor() {
    super();
  }

  async uploadFile(file): Promise<any> {
    // return await this.main.mongoDbController.uploadFile(file);
  }
}
