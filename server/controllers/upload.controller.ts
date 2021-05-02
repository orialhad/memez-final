//region imports
import {BaseController, IBaseController} from './base.controller';

//endregion


export interface IUploadController extends IBaseController {

    getFile(filename: string): Promise<any>

}


export class UploadController extends BaseController implements IUploadController {

    constructor() {
        super();
    }

    async getFile(filename): Promise<any> {
        return await this.main.mongoDbController.getFile(filename);

    }

}
