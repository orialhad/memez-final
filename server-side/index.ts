import {MainController} from './controllers/main.controller';
import {UserController} from './controllers/user.controller';
import {PostController} from './controllers/post.controller';
import {HttpController} from './controllers/http.controller';
import {MongoDBController} from './controllers/mongoDBController';
import {LikeController} from './controllers/like.controller';
import {UploadController} from './controllers/upload.controller';
import {AuthController} from './controllers/auth.controller';

(async () => {
    const
        likeController    = new LikeController(),
        postController    = new PostController(),
        userController    = new UserController(),
        authController    = new AuthController(),
        uploadController  = new UploadController(),
        httpController    = new HttpController(),
        mongoDBController = new MongoDBController(),
        mainController    = new MainController(
            userController,
            likeController,
            postController,
            authController,
            uploadController,
            httpController,
            mongoDBController
        );
    try {
        await mainController.init()
        console.log('main controller has initialized');
    } catch (e) {
        console.log(`failed to initialize main controller ${e} `);
    }


})()


function onExit(err) {
    if (err) {
        console.error(err, 'NODE ERROR >>> ', 'ERRORS');
    } else {
        console.log('Node process - no error.', 'runner');
    }
}

export const processMgmt = () => {
    const proc: any = process;
    proc.on('uncaughtException', onExit);
    proc.on('exit', onExit);
    proc.on('SIGINT', onExit);
}
