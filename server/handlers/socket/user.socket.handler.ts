import {HttpController} from '../../controllers/http.controller';


export async function getUserHandler(this: HttpController, socket, data, req_id) {
    try {
        const user = await this.main.userController.getUserById(data);
        socket.emit('getUser', user, req_id);
    } catch (e) {
        socket.emit('getUser', {msg: `Something went wrong` + e}, req_id);
    }
}


export async function editProfilePicHandler(this: HttpController, socket, data, req_id) {
    try {
        const
            updateUser = await this.main.userController.editProfilePic(data.id, data.avatar),
            posts      = await this.main.postController.getPostsWithData(),
            user       = await this.main.userController.getUserById(data.id);
        socket.emit('editProfilePic', updateUser, req_id);
        socket.broadcast.emit('postsUpdate', posts);
        socket.broadcast.emit('usersUpdate', user);
    } catch (e) {
        socket.emit('editProfilePic', {msg: `Something went wrong` + e}, req_id);
    }
}


export async function editEmailHandler(this: HttpController, socket, data, req_id) {
    try {
        const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        if (re.test(data.email)) {
            const email_exist = await this.main.userController.getUserByEmail(data.email);
            if (!email_exist) {
                const updateUser = await this.main.userController.editEmail(data.id, data.email),
                      user       = await this.main.userController.getUserById(data.id);
                socket.emit('editEmail', updateUser, req_id);
                socket.broadcast.emit('usersUpdate', user);
            } else {
                socket.broadcast.emit('errorHandler', `This email is already in use ! `);
                console.error('already in database');
            }
        } else {
            socket.broadcast.emit('errorHandler', `This  is not a valid Email !!! `);
        }
    } catch (e) {
        socket.broadcast.emit('errorHandler', `ERROR ! `);
        console.error('already in database');
    }


}
