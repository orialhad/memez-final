import {BaseController, IBaseController} from './base.controller';

import {IPost} from '../../sheard/interfaces/IPost';
import {IUser} from '../../sheard/interfaces/IUser';

export interface IPostController extends IBaseController {
    getPosts(): Promise<IPost[]>;

    createPost(post: IPost): Promise<any>;

    getPostUsers(user_id: string): Promise<IUser>

    deletePost(post_id: string): Promise<any>;

    getPostsWithData(): Promise<IPost[]>;
}


export class PostController extends BaseController implements IPostController {

    constructor() {
        super();
    }

    async getPosts(): Promise<IPost[]> {
        return await this.main.mongoDbController.getPosts();
    }

    async getPostsWithData(): Promise<IPost[]> {
        return await this.main.mongoDbController.getPostsWithData();
    }

    async createPost(post: IPost): Promise<any> {
        return this.main.mongoDbController.createPost(post);

    }

    async getPostUsers(user_id: string): Promise<IUser> {
        return this.main.mongoDbController.getUsersFor(user_id)
    }

    deletePost(post_id: string): Promise<any> {
        return this.main.mongoDbController.deletePost(post_id)
    }


}
