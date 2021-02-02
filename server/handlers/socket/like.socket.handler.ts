import {HttpController} from '../../controllers/http.controller';
import {ILike}          from '../../../sheard/interfaces/ILike';
import * as dayjs       from 'dayjs';


export async function createLikeHandler(this: HttpController, socket, data, req_id) {
    const
        like: ILike = {
            userLiked: data.userLiked,
            postLiked: data.postLiked,
            timestamp: dayjs().format(`DD.MM.YY ` + `HH:mm:ss`)
        };
    try {
        const
            newLike = await this.main.likeController.createLike(like),
            posts   = await this.main.postController.getPostsWithData();
        socket.emit('createLike', newLike, req_id);
        socket.broadcast.emit('postsUpdate', posts);


    } catch (e) {
        socket.emit('createLike', {msg: `Something went wrong` + e}, req_id);
    }
}


export async function unlikeHandler(this: HttpController, socket, data, req_id) {
    try {
        const deletedLike = await this.main.likeController.unLike(data),
              posts       = await this.main.postController.getPostsWithData();
        socket.emit('unlike', deletedLike, req_id);
        socket.broadcast.emit('postsUpdate', posts);
    } catch (e) {
        socket.emit('unlike', {msg: `Something went wrong` + e}, req_id);
    }
}
