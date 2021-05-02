//region imports
import {BaseController, IBaseController} from './base.controller';
import {IUser}                           from '../../sheard/interfaces/IUser';

//endregion

export interface IUserController extends IBaseController {

    createUser(user: IUser): Promise<any>

    getUserById(id: string): Promise<IUser>

    getUserByName(userName): Promise<IUser>

    getUserByEmail(email): Promise<IUser>;

    editProfilePic(id, avatar): Promise<any>

    editEmail(id, email): Promise<any>;


}

export class UserController extends BaseController implements IUserController {

    constructor() {
        super();
    }

    async createUser(user: IUser): Promise<any> {
        return await this.main.mongoDbController.createUser(user);
    }

    async getUserById(id: string): Promise<IUser> {
        return await this.main.mongoDbController.getUserById(id);
    }

    async getUserByName(userName): Promise<IUser> {
        return await this.main.mongoDbController.getUserByName(userName);
    }

    async getUserByEmail(email): Promise<IUser> {
        return await this.main.mongoDbController.getUserByEmail(email);
    }

    async editProfilePic(id, avatar): Promise<any> {
        return await this.main.mongoDbController.editProfilePic(id, avatar);
    }

    async editEmail(id, email): Promise<any> {
        return await this.main.mongoDbController.editEmail(id, email);
    }

}
