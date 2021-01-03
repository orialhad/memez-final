import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';
import {IUser} from '../../sheard/interfaces/IUser';
import * as PassportLocal from 'passport-local';
import * as passport from 'passport';

const LocalStrategy = PassportLocal.Strategy;





export const logoutHandler = async function(this: IMainController, req: Request, res: Response) {

};


export const signupHandler = async function(this: IMainController, req: Request, res: Response) {

    const user: IUser = {username: req.body.username, password: req.body.password, avatar: ''};

    try {
        //chek if already exist
        const exist = await this.userController.getUserByName(req.body.username);
        if (!exist) {
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
//
// export const getCurrUSerHandler = async function(this: IMainController, req: Request, res: Response) {
//     const user: IUser = {username: req.body.username, password: req.body.password};
//
//     try{
//         if(this.authController.isLoggedIn){
//             res.send(this.userController.getUserByName(req.body.username)).end()
//         }
//     }catch (e) {
//         console.log(e)
//     }
// };

