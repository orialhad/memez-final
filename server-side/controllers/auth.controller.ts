import {BaseController, IBaseController} from './base.controller';
import * as passport from 'passport';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;

export interface IAuthController extends IBaseController {

    // auth(): Promise<any>

    generateHash(password: string): Promise<any>

    validatePassword(password, req, res): Promise<any>

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

    async validatePassword(password, req, res) {
        return bcrypt.compare(req.body.password, password).then(function(result) {
            //console.log('Hashed password comparison: ' + result);
            return result;
        });

    }

    isLoggedIn(req, res) {
        console.log('session ', req.session);
        if (req.isAuthenticated()) {
            return null;
        }
        return res.status(400).json({'statusCode': 400, "message": "not authenticated"})
    }





}
