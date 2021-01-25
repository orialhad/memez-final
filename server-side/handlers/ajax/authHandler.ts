import {IMainController}   from '../../controllers/main.controller';
import {Request, Response} from 'express';
import {IUser}             from '../../../sheard/interfaces/IUser';
import * as PassportLocal  from 'passport-local';
import {isLoggedIn}        from '../../config/passport-local';

// const LocalStrategy = PassportLocal.Strategy;

export const logoutHandler = async function(this: IMainController, req: Request, res: Response) {
    req.logout();
    req.session.destroy(null)
    res.status(200).json({'statusCode': 200});
};

export const signupHandler = async function(this: IMainController, req: Request, res: Response) {
    const user: IUser = {username: req.body.username, password: req.body.password, avatar: '',email:req.body.email};
    try {
        //chek if already exist
        const username_exist = await this.userController.getUserByName(req.body.username),
              email_exist = await this.userController.getUserByEmail(req.body.email)
        if (!username_exist && !email_exist) {
            user.password = await this.authController.generateHash(req.body.password);
            res.status(200).json({'statusCode': 400, msg: 'user created'});
            if (user.password) {
                return await this.userController.createUser(user);
            }
            res.status(400).json({'statusCode': 400, 'message': 'password is empty'});
        }
        res.status(400).json({'statusCode': 400, 'message': 'Choose a different username'});
    } catch (e) {
        return res.status(404).send('error' + e);
    }
};

export const getCurrUserHandler = async function(this: IMainController, req: Request, res: Response) {
    const user = req.user,
          session = req.session
    try{

    }catch (e) {
        console.log(e)
    }
};

