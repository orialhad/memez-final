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

// export async function createUserHandler(this: HttpController, socket, data, req_id) {
//     console.log('data', data)
//     const user: IUser = {username: data.username, password: data.password};
//     try {
//         const newUser = await this.main.userController.createUser(user);
//         socket.emit('createUser', newUser, req_id);
//
//     } catch (e) {
//         socket.emit('createUser', {msg: `Something went wrong` + e}, req_id);
//     }
// }


export async function editProfilePicHandler(this: HttpController, socket, data, req_id) {
    try {
        const
            updatedUser = await this.main.userController.editProfilePic(data.id, data.avatar),
            posts       = await this.main.mongoDbController.getPostsWithData();
        socket.emit('editProfilePic', updatedUser, req_id);
        socket.broadcast.emit('postsUpdate', posts);
    } catch (e) {
        socket.emit('editProfilePic', {msg: `Something went wrong` + e}, req_id);
    }
}
