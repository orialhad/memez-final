//region imports
import {BaseController, IBaseController} from './base.controller';
import {ILike}                           from '../../sheard/interfaces/ILike';

//endregion

export interface ILikeController extends IBaseController {

    getPostLikes(post_id: string): Promise<ILike[]>;

    createLike(user): Promise<any>;

    unLike(like_id: string): Promise<ILike>

}

export class LikeController extends BaseController implements ILikeController {
    constructor() {
        super();


    }


    async getPostLikes(post_id: string): Promise<ILike[]> {
        return await this.main.mongoDbController.getPostLikes(post_id);
    };


    async createLike(like: ILike): Promise<ILike> {
        return await this.main.mongoDbController.createLike(like);
    };


    async unLike(Like_id): Promise<ILike> {
        return await this.main.mongoDbController.unLike(Like_id);
    };


}
