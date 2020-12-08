import * as mongoose from 'mongoose';
import * as dayjs                        from "dayjs";
import {BaseController, IBaseController} from './base.controller';
import UserModel, {IUserModel} from '../models/user.model';
import PostModel, {IPostModel} from '../models/post.model';
import LikeModel, {ILikeModel} from '../models/like.model';

import {ObjectId}                        from "mongodb";

export interface IDBController extends IBaseController {
  run(): Promise<void>;

  // USER:
  getAllUsers(): Promise<IUserModel[]>;

  getUserById(id: IUserModel['_id']): Promise<IUserModel>

  createUser(name: IUserModel['name']): Promise<IUserModel>

  // POSTS:

  getAllPosts(): Promise<IPostModel[]>;

  getPostById(id: IPostModel['_id']);

  createPost(user_id: IUserModel['_id'], content: string): Promise<IPostModel>;

  deletePost(post_id: string): Promise<IPostModel>;

  // LIKES + POSTS

  getPostFromLike(post_id: IPostModel['_id']): Promise<ILikeModel[]>;

  //LIKES

  getAllLikes(): Promise<ILikeModel[]>;

  getLikeById(id: ILikeModel['_id']): Promise<ILikeModel>;

  createLike(user_id: IUserModel['_id'], post_id: IPostModel['_id']): Promise<ILikeModel>;

  removeLike(like_id: ILikeModel['_id']): Promise<ILikeModel>;


}

export class DBController extends BaseController implements IDBController {


  uri = 'mongodb+srv://orial:1234@cluster0.omxjt.mongodb.net/myApp2?retryWrites=true&w=majority';


  constructor() {
    super();
  }

  async init(): Promise<any> {
    await this.run();


  }

  async run() {
    try {
      await mongoose.connect(this.uri,
        {useNewUrlParser: true,});
      console.log('successfully connected to mongoDB');
    } catch (e) {
      console.error(`no connection to mongoDB ${e} `);
    }
  }


  //USERS

  async getAllUsers(): Promise<IUserModel[]> {
    return await UserModel.find().exec();
  }


  async getUserById(id: IUserModel['_id']): Promise<IUserModel> {
    return await UserModel.findById(id).exec();
  }



  async createUser(name: IUserModel['name']): Promise<IUserModel>{
    return await UserModel.create({name : name})
  }

  // POSTS:

  async getAllPosts(): Promise<IPostModel[]>{
    return await PostModel.find().populate(`postedBy`).exec()
  };

  async getPostById(id: IPostModel['_id']){
    return await PostModel.findById(id).populate(`postedBy`).exec()
  };

  async createPost(user_id: IUserModel['_id'], content: string): Promise<IPostModel>{
    return await PostModel.create(
      {
        content: content,
        postedBy: user_id,
        date    : dayjs().format('DD.MM.YY'),
        time    : dayjs().format('HH:mm'),
      }
    )
  };

  async deletePost(post_id: string): Promise<IPostModel>{
    return await PostModel.findByIdAndDelete(post_id,{useFindAndModify:false}).exec();
  };

  // LIKES + POSTS

  async getPostFromLike(post_id: IPostModel['_id']): Promise<ILikeModel[]>{
    // @ts-ignore
    return await LikeModel.find({postLiked:ObjectId(post_id)}).exec()
  };

  //LIKES

  async getAllLikes(): Promise<ILikeModel[]>{
    return await LikeModel.find().populate(`userLiked`).populate(`postLike`).exec()
  };

 async getLikeById(id: ILikeModel['_id']): Promise<ILikeModel>{
   return await LikeModel.findById(id).populate(`userLiked`).populate(`postLike`).exec()
 };

  async createLike(user_id: IUserModel['_id'], post_id: IPostModel['_id']): Promise<ILikeModel>{
    return await LikeModel.create({
      timestamp: dayjs().format(`DD.MM.YY`),
      userLiked: user_id,
      postLiked: post_id
    })
  };

  async removeLike(like_id: ILikeModel['_id']): Promise<ILikeModel>{
    return await LikeModel.findByIdAndDelete(like_id,{useFindAndModify:false}).exec()
  };


}







