import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';
import {uploadFiles} from '../config/upload_storage';
import {gfs} from '../controllers/mongoDBController';


export const uploadHandler = async function(this: IMainController, req: Request, res: Response) {
    try {
        await uploadFiles(req, res);
        console.log(`upload handler: `, req.file);
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }else {
            console.log('file uploaded')
            return res.status(200).send({msg:`File has been successfully uploaded.`});
        }
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload file: ${error}`);
    }
};

export const getFileHandler = async function(this: IMainController, req: Request, res: Response) {
    console.log('im in the upload handler ')
    try {
        if(!req.params.filename) {
            console.log('bla ', req.params.path)
            res.status(404).send({code: 404 ,msg: 'no file name'})
        }else {
            const newFile =  await this.mongoDbController.getFile(req.params.filename)
            const readSteam = gfs.prototype.stream(newFile.filename)
            readSteam.pipe(res)
            console.log("handler:" ,newFile)
            // res.send(newFile);


        }
        res.status(200)
    }catch (e) {
        res.status(500).send({code: 500 ,msg: 'cant get file address'})
    }
};

