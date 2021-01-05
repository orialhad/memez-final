import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';
import {uploadFiles} from '../config/upload_storage';
import {MongoDBController} from '../controllers/mongoDBController';


export const uploadHandler = async function(this: IMainController, req: Request, res: Response) {
    try {
        await uploadFiles(req, res);
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        } else {
            console.log('file uploaded', req.file.filename);
            const name = req.file.filename
            return res.send({filename: name})
             // res.status(200).send({msg: `File has been successfully uploaded.`});
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({code: 404, msg: `Error when trying upload file: ${error}`});
    }
};

export const getFileHandler = async function(this: IMainController, req: Request, res: Response) {
    try {
        if (!req.params.filename) {
            res.status(404).send({code: 404, msg: 'There is no file name detected'});
        } else {
            const newfile = await this.uploadController.getFile(req.params.filename);
            if (newfile) {
                newfile.pipe(res);
            } else {
                res.status(404).send({code: 404, msg: 'can not get file address'});
            }
        }
        res.status(200);
    } catch (e) {
        res.status(404).send({code: 404, msg: 'can not get file address'});
    }
};


// export const getLastUploadHandler = async function(this: IMainController, req: Request, res: Response) {
//     try {
//         const newfile = await this.uploadController.getLastUpload();
//         if (newfile) {
//             res.set({responseType: 'blob'});
//             newfile.pipe(res);
//             res.status(200);
//         } else {
//             res.status(404).send({code: 404, msg: 'can not get file address'});
//         }
//     } catch (e) {
//         res.status(404).send({code: 404, msg: 'can not get file address'});
//     }
// };

