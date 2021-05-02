//region imports
import {BaseController, IBaseController} from './base.controller';
import {IComment}                        from '../../sheard/interfaces/IComment';

//endregion


export interface ICommentController extends IBaseController {

    createComment(comment: IComment): Promise<any>;

    deleteComment(comment_id: string): Promise<any>

    getPostComments(comment_id: string): Promise<IComment[]>

}

export class CommentController extends BaseController implements ICommentController {
    constructor() {
        super();

    }

    async createComment(comment: IComment): Promise<any> {
        return await this.main.mongoDbController.createComment(comment);
    };

    async deleteComment(comment_id): Promise<any> {
        return await this.main.mongoDbController.deleteComment(comment_id);
    };

    async getPostComments(post_id: string): Promise<IComment[]> {
        return await this.main.mongoDbController.getPostComments(post_id);
    };


}
