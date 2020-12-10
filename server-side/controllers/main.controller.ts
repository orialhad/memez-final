import {IDBController} from './db.controller';
import {IHttpController} from './http.controller';
import {BaseController, IBaseController} from './base.controller';
import {IPostController} from './post.controller';
import {ILikeController} from './like.controller';
import {IUserController} from './user.controller';
import {createUserHandler,  getUsersHandler} from '../handlers/user.handler';
import {createPostHandler, getPostsHandler, } from '../handlers/post.handler';
import {createLikeHandler, getLikesHandler,} from '../handlers/like.handler';

export interface IMainController extends IBaseController {
  userController: IUserController
  postController: IPostController
  likeController: ILikeController
  httpController: IHttpController
  dbController: IDBController

}


export class MainController extends BaseController implements IMainController {

  constructor(
    public userController: IUserController,
    public likeController: ILikeController,
    public postController: IPostController,
    public httpController: IHttpController,
    public dbController: IDBController
  ) {
    super();

    this.userController.main = this;
    this.likeController.main = this;
    this.postController.main = this;
    this.httpController.main = this;
    this.dbController.main = this;

  }
  async init(): Promise<void> {
    await this.httpController.init()
    await this.dbController.init()


    this.addEventListeners()


  }

  addEventListeners() {
    this.httpController.events.addListener('create_user', createUserHandler.bind(this))
    this.httpController.events.addListener('all_users', getUsersHandler.bind(this))
    this.httpController.events.addListener('all_posts', getPostsHandler.bind(this))
    this.httpController.events.addListener('upload_post', createPostHandler.bind(this))
    this.httpController.events.addListener('all_likes', getLikesHandler.bind(this))
    this.httpController.events.addListener('create_like', createLikeHandler.bind(this))
    // this.httpController.events.addListener('user', getUserByIdHandler.bind(this))
    // this.httpController.events.addListener('post_likes', getPostLikes.bind(this))
    // this.httpController.events.addListener('post', getPostByIdHandler.bind(this))
    // this.httpController.events.addListener('delete_post', deletePostHandler.bind(this))
    // this.httpController.events.addListener('like', getLikeByIdHandler.bind(this))
    // this.httpController.events.addListener('delete_like', removeLikeHandler.bind(this))
    // this.httpController.events.addListener('post_likes', getPostFromLikeHandler.bind(this))
  }

}
