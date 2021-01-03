import {Request, Response} from 'express';
import {IMainController} from '../controllers/main.controller';
import {IUser} from '../../sheard/interfaces/IUser';


export const getUsersHandler = async function(this: IMainController, req: Request, res: Response) {
  try {
    const users = await this.userController.getUsers();

    return res.json(users).end();


  } catch (e) {
    return res.status(404).send('error' + e);
  }
};




export const createUserHandler = async function(this: IMainController, req: Request, res: Response) {
  const user: IUser = {username: req.body.userName, password: req.body.password};
  try {
    const newUser = await this.userController.createUser(user);
    return res.json(newUser).end();
  } catch (e) {
    return res.status(404).json({msg: 'no user was added' + e});

  }
};

export const editProfilePicHandler = async function (this: IMainController, req: Request, res: Response){
  try{
    const updatedUser = await this.userController.editProfilePic(req.params.id,req.body.avatar)
    return res.json(updatedUser).end();
  }catch (e) {
    return res.status(404).json({msg: 'can not updated user' + e});
  }
}

