import util = require('util');
import multer = require('multer');
import GridFsStorage = require('multer-gridfs-storage');
import {config} from '../config/config';
import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';




export const uploadPhotoHandler = async function(this: IMainController, req: Request, res: Response) {

  // var storage = new GridFsStorage({
  //   url: config.URL + `/photos`,
  //   options: {useNewUrlParser: true, useUnifiedTopology: true},
  //   file: (req, file) => {
  //     const match = ["image/png", "image/jpeg"];
  //
  //     if (match.indexOf(file.mimetype) === -1) {
  //       const filename = `${Date.now()}-memez-${file.originalname.trim().replace(/ /g, '')}`;
  //       return filename;
  //     }
  //
  //     return {
  //       bucketName: "photos",
  //       filename: `${Date.now()}-memez-${file.originalname.trim().replace(/ /g, '')}`
  //     };
  //   }
  // });
  //
  // let uploadFile = multer({storage: storage}).single("file")
  // let uploadFilesMiddleware = util.promisify(uploadFile);
  //
  // try {
  //   const newUpload = await this.uploadController.uploadPhoto(uploadFilesMiddleware);
  //   return res.sendFile(`/photos`)
  // }catch (e) {
  //   return res.status(404).send({msg: 'filed did not upload ' + e});
  // }
}
