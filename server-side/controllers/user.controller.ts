import {BaseController, IBaseController} from './base.controller';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';

export interface IUserController extends IBaseController {

    getUsers(): Promise<IUser[]>;

    getUser(id: string): Promise<IUser>

    getUserByName(userName): Promise<IUser>

    createUser(user: IUser): Promise<any>
}


export class UserController extends BaseController implements IUserController {


    constructor() {
        super();



    }

    async getUsers(): Promise<IUser[]> {
        return await this.main.mongoDbController.getUsers();

    }

    async getUser(id: string): Promise<IUser> {
        return await this.main.mongoDbController.getUser(id);
    }

    async createUser(user: IUser): Promise<IUser> {
        return await this.main.mongoDbController.createUser(user);
    }

    async getUserByName(userName): Promise<IUser> {
        return await this.main.mongoDbController.getUserByName(userName);
    }


}
