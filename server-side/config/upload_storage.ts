import {config} from './config';
import * as path from 'path';

import util = require('util');
import multer = require('multer');
import GridFsStorage = require('multer-gridfs-storage');
import crypto = require('crypto');

const storage = new GridFsStorage({
    url    : config.URL,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file   : (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const
                    filename = buf.toString('hex') + path.extname(file.originalname),
                    fileInfo = {
                        filename  : filename,
                        bucketName: 'uploads'
                    };
                resolve(fileInfo);
            });
        });
    }
});
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'uploads');
//     },
//     filename(req, file, callback) {
//         callback(null,`blablabal_${file.originalname.toLowerCase().trim()}`);
//     }
// })

export const upload = multer({storage}).single('file');

