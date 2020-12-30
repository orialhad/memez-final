import {BaseController, IBaseController} from './base.controller';


export interface IUploadController extends IBaseController {

  getFile(photo: any): Promise<any>


}


export class UploadController extends BaseController implements IUploadController {

  constructor() {
    super();
  }

  async getFile(filename): Promise<any> {
    console.log('upload controller: ', filename)
    return await this.main.mongoDbController.getFile(filename);
  }
}
