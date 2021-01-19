import {HttpController} from '../../controllers/http.controller';
import {IMainController} from '../../controllers/main.controller';
import {Request, Response} from 'express';
import {ILike} from '../../../sheard/interfaces/ILike';
import * as dayjs from 'dayjs';
import {IComment} from "../../../sheard/interfaces/IComment";




export async function createCommentHandler(this: HttpController, socket, data, req_id) {
    const comment: IComment = {
        userCommentedId: data.userCommentedId,
        postCommentedId: data.postCommentedId,
        content        : data.content,
        date           : dayjs().format('DD.MM.YY'),
        time           : dayjs().format('hh:mm:ss')
    };

    try {
        const
            newComment = await this.main.commentController.createComment(comment),
            posts   = await this.main.postController.getPostsWithData();
        socket.emit('createComment', newComment, req_id);
        socket.broadcast.emit('postsUpdate', posts);


    } catch (e) {
        socket.emit('createComment', {msg: `Something went wrong` + e}, req_id);
    }
}


export async function deleteCommentHandler(this: HttpController, socket, data, req_id) {
    try {
        const deleteComment = await this.main.commentController.deleteComment(data),
              posts       = await this.main.mongoDbController.getPostsWithData();
        socket.emit('deleteComment', deleteComment, req_id);
        socket.broadcast.emit('postsUpdate', posts);
    } catch (e) {
        socket.emit('deleteComment', {msg: `Something went wrong` + e}, req_id);
    }
}
