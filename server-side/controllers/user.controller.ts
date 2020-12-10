import {BaseController, IBaseController} from './base.controller';
import {IUser} from '../../projects/memez/src/app/types/interfaces/IUser';

export interface IUserController extends IBaseController {

  getUsers(): Promise<IUser[]>;

  createUser(user: IUser): Promise<any>
}


export class UserController extends BaseController implements IUserController {


  constructor() {
    super();
  }

  async getUsers(): Promise<IUser[]> {
    return await this.main.dbController.getUsers()
  }

  async createUser(user: IUser): Promise<IUser> {
    return await this.main.dbController.createUser(user)
  }


}
