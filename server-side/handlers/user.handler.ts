import {Request, Response} from 'express';
import {IMainController} from '../controllers/main.controller';
import {IUserModel} from '../models/user.model';


export const getAllUsersHandler = async function(this: IMainController, req: Request, res: Response) {
  try {
    const users = await this.userController.getAllUsers();

    return res.json(users).end();


  } catch (e) {
    return res.status(404).send('error' + e);
  }
};

export const getUserByIdHandler = async function(this: IMainController, req: Request, res: Response) {
  try {
    const user = await this.userController.getUserById(req.params.id);

    return res.json(user).end();
  } catch (e) {
    return res.status(404).send({msg: 'User was not found' + e});
  }

};

export const createUserHandler = async function(this: IMainController, req: Request, res: Response) {
  const user_name: IUserModel['name'] = req.body.name;

  try {
    const newUser = await this.userController.createUser(user_name);

    return res.json(newUser).end();
  } catch (e) {
    return res.status(404).json({msg: 'no user was added' + e});

  }
};

