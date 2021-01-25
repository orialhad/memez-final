import {BaseController, IBaseController} from './base.controller';
import {IUser} from '../../sheard/interfaces/IUser';

export interface IUserController extends IBaseController {

    getUsers(): Promise<IUser[]>;

    getUserById(id: string): Promise<IUser>

    getUserByName(userName): Promise<IUser>

    editProfilePic(id, avatar): Promise<any>

    createUser(user: IUser): Promise<any>

    editEmail(id, email): Promise<any>;

    getUserByEmail(email): Promise<IUser>;
}


export class UserController extends BaseController implements IUserController {


    constructor() {
        super();



    }

    async getUsers(): Promise<IUser[]> {
        return await this.main.mongoDbController.getUsers();

    }

    async getUserById(id: string): Promise<IUser> {
        return await this.main.mongoDbController.getUserById(id);
    }

    async createUser(user: IUser): Promise<any> {
        return await this.main.mongoDbController.createUser(user);
    }

    async editProfilePic(id, avatar): Promise<any> {
        return await this.main.mongoDbController.editProfilePic(id, avatar);
    }

    async editEmail(id, email): Promise<any> {
        return await this.main.mongoDbController.editEmail(id, email);
    }

    async getUserByName(userName): Promise<IUser> {
        return await this.main.mongoDbController.getUserByName(userName);
    }


    async getUserByEmail(email): Promise<IUser> {
        return await this.main.mongoDbController.getUserByEmail(email);
    }


}
