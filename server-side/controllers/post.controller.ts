import {BaseController, IBaseController} from './base.controller';

import {IPost} from '../../projects/memez/src/app/types/interfaces/IPost';

export interface IPostController extends IBaseController {
  getPosts(): Promise<IPost[]>;

  createPost(post: IPost): Promise<any>;


}


export class PostController extends BaseController implements IPostController {

  constructor() {
    super();
  }

  async getPosts(): Promise<IPost[]> {
    return await this.main.dbController.getPosts();
  }

  async createPost(post: IPost): Promise<any> {
    return this.main.dbController.createPost(post);

  }


}
