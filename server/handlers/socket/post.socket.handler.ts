import {HttpController} from '../../controllers/http.controller';
import * as dayjs       from 'dayjs';
import {IPost}          from '../../../sheard/interfaces/IPost';


export async function getPostsHandler(this: HttpController, socket, data, req_id) {
    try {
        const posts = await this.main.postController.getPostsWithData();
        socket.emit('getPosts', posts, req_id);
    } catch (e) {
        socket.emit('getPosts', {msg: `Something went wrong` + e}, req_id);
    }
}

export async function createPostHandler(this: HttpController, socket, data, req_id) {
    const post: IPost = {
        content    : data.content,
        postedBy_id: data.postedBy_id,
        date       : dayjs().format(`DD.MM.YY`),
        time       : dayjs().format(`HH:mm.ss`),
        likes      : [],
        comments   : [],
        image      : data.image
    };
    try {
        if (post.postedBy_id) {
            const
                postToUpload = await this.main.postController.createPost(post),
                posts        = await this.main.postController.getPostsWithData();
            socket.emit('createPost', postToUpload, req_id);
            socket.broadcast.emit('postsUpdate', posts);
        } else {
            console.log('cant post that ');
        }
    } catch
        (e) {
        socket.emit('createPost', {msg: `Something went wrong` + e}, req_id);
    }
}


export async function deletePostHandler(this: HttpController, socket, data, req_id) {
    console.log(data.id);
    try {
        const postToDelete = await this.main.postController.deletePost(data.id),
              posts        = await this.main.postController.getPostsWithData();
        socket.emit('deletePost', postToDelete, req_id);
        socket.broadcast.emit('postsUpdate', posts);
    } catch (e) {
        socket.emit('deletePost', {msg: `Something went wrong` + e}, req_id);
    }
}
