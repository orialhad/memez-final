import {HttpController} from '../../controllers/http.controller';
import * as dayjs       from 'dayjs';
import {IUser}          from '../../../sheard/interfaces/IUser';


export async function getUsersHandler(this: HttpController, socket, data, req_id) {
    try {
        const
            users = await this.main.userController.getUsers();
        socket.emit('getUsers', users, req_id);
    } catch (e) {
        socket.emit('getUsers', {msg: `Something went wrong` + e}, req_id);
    }
}

export async function getUserHandler(this: HttpController, socket, data, req_id) {
    try {
        const
            users = await this.main.userController.getUserById(data);
        socket.emit('getUser', users, req_id);
    } catch (e) {
        socket.emit('getUser', {msg: `Something went wrong` + e}, req_id);
    }
}



export async function editProfilePicHandler(this: HttpController, socket, data, req_id) {
    try {
        const
            updatedUser = await this.main.userController.editProfilePic(data.id, data.avatar),
            posts       = await this.main.postController.getPostsWithData(),
            user        = await this.main.userController.getUserById(data.id);
        socket.emit('editProfilePic', updatedUser, req_id);
        socket.broadcast.emit('postsUpdate', posts);
        socket.broadcast.emit('usersUpdate', user);
    } catch (e) {
        socket.emit('editProfilePic', {msg: `Something went wrong` + e}, req_id);
    }
}


export async function editEmailHandler(this: HttpController, socket, data, req_id) {
    try {
        const
            email_exist = await this.main.userController.getUserByEmail(data.email),
            updatedUser = await this.main.userController.editEmail(data.id, data.email),
            user        = await this.main.userController.getUserById(data.id);
        if (!email_exist) {
            socket.emit('editEmail', updatedUser, req_id);
            socket.broadcast.emit('usersUpdate', user);
        } else {
            socket.emit('editEmail', 'Error!!!!', req_id);
            console.error('already in database');
        }
    } catch (e) {
        console.error('already in database');
    }
}
