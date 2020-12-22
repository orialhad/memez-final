
import {MainController} from "./controllers/main.controller";
import {UserController} from "./controllers/user.controller";
import {PostController} from "./controllers/post.controller";
import {HttpController} from "./controllers/http.controller";
import {MongoDBController}   from "./controllers/mongoDBController";
import {LikeController} from './controllers/like.controller';
import {UploadController} from './controllers/upload.controller';

(async () => {
  const
    likeController = new LikeController(),
    postController = new PostController(),
    userController = new UserController(),
    uploadController = new UploadController(),
    httpController = new HttpController(),
    dbController   = new MongoDBController(),
    mainController = new MainController(
      userController,
      likeController,
      postController,
      uploadController,
      httpController,
      dbController
    );
  try {
    await mainController.init()
    console.log(console.log('main controller has initialized'))
  } catch (e) {
    console.log(`failed to initialize main controller ${e} `);
  }


})()
