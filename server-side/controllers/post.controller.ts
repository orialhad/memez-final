import {BaseController, IBaseController} from './base.controller';
import {IPostModel} from '../models/post.model';
import {IUserModel} from '../models/user.model';

export interface IPostController extends IBaseController {
  getAllPosts(): Promise<IPostModel[]>;

  getPostById(id: IPostModel['_id']);

  createPost(user_id: IUserModel['_id'], content: string): Promise<IPostModel>;

  deletePost(post_id: string): Promise<IPostModel>;
}


export class PostController extends BaseController implements IPostController {

  constructor() {
    super();
  }

  async getAllPosts(): Promise<IPostModel[]> {
    return await this.main.dbController.getAllPosts();


  }

  async getPostById(id: IPostModel['_id']): Promise<IPostModel> {
    return await this.main.dbController.getPostById(id);
  }

  async createPost(content: string, user_id: IUserModel['_id']): Promise<IPostModel> {

    return this.main.dbController.createPost(content, user_id);

  }

  async deletePost(post_id: string): Promise<IPostModel> {
    return this.main.dbController.deletePost(post_id);

  }

}
