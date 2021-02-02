import {IMongoDBController}              from './mongoDBController';
import {IHttpController}                 from './http.controller';
import {BaseController, IBaseController} from './base.controller';
import {IPostController}                 from './post.controller';
import {ILikeController}                 from './like.controller';
import {IUserController}                 from './user.controller';
import {IUploadController}               from './upload.controller';
import {logoutHandler, signupHandler}    from '../handlers/ajax/authHandler';
import {IAuthController}                 from './auth.controller';
import {getFileHandler, uploadHandler}   from '../handlers/ajax/upload.handler';
import {ICommentController}              from './comment.controller';


export interface IMainController extends IBaseController {
    userController: IUserController
    postController: IPostController
    authController: IAuthController
    uploadController: IUploadController
    likeController: ILikeController
    commentController: ICommentController
    httpController: IHttpController
    mongoDbController: IMongoDBController

}


export class MainController extends BaseController implements IMainController {

    constructor(
        public userController: IUserController,
        public likeController: ILikeController,
        public postController: IPostController,
        public commentController: ICommentController,
        public authController: IAuthController,
        public uploadController: IUploadController,
        public httpController: IHttpController,
        public mongoDbController: IMongoDBController
    ) {
        super();
        this.userController.main    = this;
        this.likeController.main    = this;
        this.postController.main    = this;
        this.authController.main    = this;
        this.commentController.main = this;
        this.uploadController.main  = this;
        this.httpController.main    = this;
        this.mongoDbController.main = this;

    }

    async init(): Promise<void> {
        await this.httpController.init();
        await this.mongoDbController.init();
        this.addEventListeners();

    }

    addEventListeners() {
        this.httpController.events.addListener('signup', signupHandler.bind(this));
        this.httpController.events.addListener('upload_file', uploadHandler.bind(this));
        this.httpController.events.addListener('logout', logoutHandler.bind(this));
        this.httpController.events.addListener('get_file', getFileHandler.bind(this));

        // this.httpController.events.addListener('all_users', getUsersHandler.bind(this));
        // this.httpController.events.addListener('edit_profile_pic', editProfilePicHandler.bind(this));
        // this.httpController.events.addListener('all_posts', getPostsHandler.bind(this));
        // this.httpController.events.addListener('upload_post', createPostHandler.bind(this));
        // this.httpController.events.addListener('delete_post', deletePostHandler.bind(this));
        // this.httpController.events.addListener('all_likes', getLikesHandler.bind(this));
        // this.httpController.events.addListener('create_like', createLikeHandler.bind(this));
        // this.httpController.events.addListener('delete_like', unLikeHandler.bind(this));
        // this.httpController.events.addListener('get_last_file', getLastUploadHandler.bind(this))
        // this.httpController.events.addListener('user', getUserByIdHandler.bind(this))
        // this.httpController.events.addListener('post_likes', getPostLikes.bind(this))
        // this.httpController.events.addListener('post', getPostByIdHandler.bind(this))
        // this.httpController.events.addListener('like', getLikeByIdHandler.bind(this))
        // this.httpController.events.addListener('post_likes', getPostFromLikeHandler.bind(this))
    }

}
