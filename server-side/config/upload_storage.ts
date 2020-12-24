import {config} from './config';
import * as path from 'path';

const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require('crypto')

export const storage = new GridFsStorage({
    url: config.URL,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const
                    filename = buf.toString('hex')+ path.extname(file.originalname),
                    fileInfo = {
                        filename: filename,
                        bucketName: 'photos'
                    };
                resolve(fileInfo)
            })
        })
    }
});

export const upload = multer({storage});

//         const match = ["image/png", "image/jpeg"];
//
//         if (match.indexOf(file.mimetype) === -1) {
//            const fileName = `${Date.now()}-memez-${file.originalname.replace(/ /g, "")}`;
//            console.log(fileName)
//            return fileName
//         }
//
//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-memez-${file.originalname.replace(/ /g, "")}`
//         };
//     }
// });
//
// let uploadFile = multer({ storage: storage }).single("file");
// export const uploadFilesMiddleware = util.promisify(uploadFile);


