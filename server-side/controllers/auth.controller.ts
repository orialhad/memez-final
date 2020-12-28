import {BaseController, IBaseController} from './base.controller';


import * as bcrypt from 'bcrypt';
const LocalStrategy = require('passport-local').Strategy;
const saltRounds = 10;

export interface IAuthController extends IBaseController {

    // auth(): Promise<any>

    generateHash(password: string): Promise<any>

    validatePassword(userName, password): Promise<any>

    isLoggedIn(req, res): Promise<null>

}

export class AuthController extends BaseController implements IAuthController {

    constructor() {
        super();
    }

    async generateHash(password: string) {
        return bcrypt.hash(password, saltRounds).then((hashed) => {
            console.log('Hashed password: ' + hashed);
            return hashed;
        });
    }

    async validatePassword(userName, password) {
        const dbPasswordHash = await this.main.userController.getUserByName(userName);
        return bcrypt.compare(password, dbPasswordHash.password)
    }


    isLoggedIn(req, res) {
        console.log('session ', req.session);
        if (req.isAuthenticated()) {
            return null;
        }
        return res.status(400).json({'statusCode': 400, "message": "not authenticated"})
    }
}
