import {BaseController, IBaseController} from './base.controller';
import {IUserModel} from '../models/user.model';

export interface IUserController extends IBaseController {
  getAllUsers(): Promise<IUserModel[]>;

  getUserById(id: IUserModel['_id']): Promise<IUserModel>

  createUser(name: IUserModel['name']): Promise<IUserModel>
}


export class UserController extends BaseController implements IUserController {


  constructor() {
    super();
  }

  async getAllUsers(): Promise<IUserModel[]> {
    return await this.main.dbController.getAllUsers()
  }

  async getUserById(id: IUserModel['_id']): Promise<IUserModel> {
    return await this.main.dbController.getUserById(id)
  }
  u
  async createUser(name: IUserModel['name']): Promise<IUserModel> {
    return await this.main.dbController.createUser(name)
  }


}
