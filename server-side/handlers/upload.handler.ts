import util = require('util');
import multer = require('multer');
import GridFsStorage = require('multer-gridfs-storage');
import {config} from '../config/config';
import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';
import {storage, upload, } from '../config/upload_storage';




export const uploadPhotoHandler = async function(this: IMainController, req: Request, res: Response) {
     async function uploadFile(req, res) {
         try {
             await upload(req, res);
             if (req.file === undefined) {
                 return res.send(`You must select a file.`);
             }
             return res.send(`File has been uploaded.`);
         } catch (error) {
             return res.send(`Error when trying upload image: ${error}`);
         }
    } const fileUpload1 = await this.uploadController.uploadPhoto(uploadFile)
    return  res.sendFile('api/photos',fileUpload1)

}
