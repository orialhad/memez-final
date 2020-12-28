
import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';






export const uploadPhotoHandler = async function(this: IMainController, req: Request, res: Response) {
    console.log('upload handler: ' + req.file.filename)
    return await this.mongoDbController.uploadFile(req.file)
}
