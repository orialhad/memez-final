import {BaseController, IBaseController} from './base.controller';
import {ILike} from '../../projects/memez/src/app/types/interfaces/ILike';
import {IPost} from '../../projects/memez/src/app/types/interfaces/IPost';


export interface ILikeController extends IBaseController {
  getLikes(): Promise<ILike[]>;

  getPostLikes(post_id: string): Promise<ILike[]>;

  createLike(user): Promise<any>;

  unLike(like_id:string): Promise<ILike>

}

export class LikeController extends BaseController implements ILikeController {
  constructor() {
    super();


  }


  async getLikes(): Promise<ILike[]> {
    return await this.main.dbController.getLikes();
  };

  async getPostLikes(post_id: string): Promise<ILike[]> {
    return await this.main.dbController.getPostLikes(post_id);
  };


  async createLike(like: ILike): Promise<ILike> {
    return await this.main.dbController.createLike(like);
  };


  async unLike(Like_id): Promise<ILike> {
    return await this.main.dbController.unLike(Like_id);
  };



}
