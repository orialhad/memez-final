import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';
import * as PassportLocal from 'passport-local';
const LocalStrategy = PassportLocal.Strategy;


export const loginHandler = async function(this: IMainController) {








};
export const signupHandler = async function(this: IMainController, req: Request, res: Response) {

    const user: IUser = {username: req.body.userName, password: req.body.password};

    try {
        //chek if already exist
        const exist = await this.mongoDbController.getUserByName(req.body.userName);
        if (!exist) {
            user.password = await this.authController.generateHash(req.body.password);
            return await this.userController.createUser(user);
        } else {
            res.status(400).json({'statusCode': 400, 'message': 'Can\'t create user'});
        }
    } catch (e) {
        return res.status(404).send('error' + e);
    }
};

