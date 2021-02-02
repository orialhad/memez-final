import {BaseController, IBaseController} from './base.controller';
import * as bcrypt                       from 'bcrypt';

const saltRounds = 10;


export interface IAuthController extends IBaseController {

    generateHash(password: string): Promise<any>

    validatePassword(userName, password): Promise<any>

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
        return bcrypt.compare(password, dbPasswordHash.password);
    }

}
