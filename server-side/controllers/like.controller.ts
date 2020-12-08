import {BaseController, IBaseController} from './base.controller';
import LikeModel, {ILikeModel} from '../models/like.model';
import {IUserModel} from '../models/user.model';
import {IPostModel} from '../models/post.model';
import {ObjectId} from 'mongodb';
import * as dayjs from 'dayjs';


export interface ILikeController extends IBaseController {
  getAllLikes(): Promise<ILikeModel[]>;

  getLikeById(id: ILikeModel['_id']): Promise<ILikeModel>;

  createLike(user_id: IUserModel['_id'], post_id: IPostModel['_id']): Promise<ILikeModel>;

  removeLike(like_id: ILikeModel['_id']): Promise<ILikeModel>;

  getPostFromLike(post_id: IPostModel['_id']): Promise<ILikeModel[]>;


}

export class LikeController extends BaseController implements ILikeController {
  constructor() {
    super();


  }


  async getAllLikes(): Promise<ILikeModel[]> {
    return await this.main.dbController.getAllLikes();
  };

  async getLikeById(id: ILikeModel['_id']): Promise<ILikeModel> {
    return await this.main.dbController.getLikeById(id);
  };

  async createLike(user_id: IUserModel['_id'], post_id: IPostModel['_id']): Promise<ILikeModel> {
    return await this.main.dbController.createLike(user_id, post_id);
  };

  async removeLike(like_id: ILikeModel['_id']): Promise<ILikeModel> {
    return await this.main.dbController.removeLike(like_id);
  };

  async getPostFromLike(post_id: IPostModel['_id']): Promise<ILikeModel[]> {
    return await this.main.dbController.getPostFromLike(post_id);
  };

}
