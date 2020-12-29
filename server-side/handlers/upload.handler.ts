import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';
import {uploadFilesMiddleware} from '../config/upload_storage';


export const uploadHandler = async function(this: IMainController, req: Request, res: Response) {
    try {
        await uploadFilesMiddleware(req, res);
        console.log(`upload handler: `, req.file);
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }else {
            console.log('file uploaded')
            return res.json(`File has been uploaded.`);
        }
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload file: ${error}`);
    }
};

