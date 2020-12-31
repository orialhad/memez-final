import {BaseController, IBaseController} from './base.controller';

import {IPost} from '../../sheard/interfaces/IPost';

export interface IPostController extends IBaseController {
  getPosts(): Promise<IPost[]>;

  createPost(post: IPost): Promise<any>;

  deletePost(post_id: string):Promise<any>;


}


export class PostController extends BaseController implements IPostController {

  constructor() {
    super();
  }

  async getPosts(): Promise<IPost[]> {
    return await this.main.mongoDbController.getPosts();
  }

  async createPost(post: IPost): Promise<any> {
    return this.main.mongoDbController.createPost(post);

  }

  deletePost(post_id: string): Promise<any> {
    return this.main.mongoDbController.deletePost(post_id)
  }


}
