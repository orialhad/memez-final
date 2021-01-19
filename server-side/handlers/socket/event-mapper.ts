import {APIEvent}                                              from '../../../sheard/api/api-events';
import {Socket as SocketIO_Socket}                             from 'socket.io/dist/socket';
import {createPostHandler, deletePostHandler, getPostsHandler} from './post.socket.handler';
import {createLikeHandler, getLikesHandler, unlikeHandler}     from './like.socket.handler';
import {editProfilePicHandler, getUsersHandler}                from './user.socket.handler';
import {createCommentHandler, deleteCommentHandler} from "./comment.socket.handler";

export const event_mapper: { [event_name in APIEvent]: (socket: SocketIO_Socket, data: any, req_id: string) => void } = {

    getPosts   : getPostsHandler,
    createPost : createPostHandler,
    deletePost : deletePostHandler,
    postsUpdate: async function(socket, data, req_id) {
    },

    getLikes  : getLikesHandler,
    createLike: createLikeHandler,
    unlike    : unlikeHandler,

    // createUser    : createUserHandler,
    getUsers      : getUsersHandler,
    editProfilePic: editProfilePicHandler,

    createComment: createCommentHandler,
    deleteComment: deleteCommentHandler

};


