// import * as mongoose from 'mongoose';
import * as dayjs from 'dayjs';
import {BaseController, IBaseController} from './base.controller';
import {Collection, Db, MongoClient, ObjectId} from 'mongodb';
import {IUser} from '../../projects/memez/src/app/types/interfaces/IUser';
import {IPost} from '../../projects/memez/src/app/types/interfaces/IPost';
import {ILike} from '../../projects/memez/src/app/types/interfaces/ILike';

import {config} from '../config/config';

const
  MongoClinet = require('mongodb').MongoClient(),
  ObjectID = require('mongodb').ObjectID;

export interface IDBController extends IBaseController {
  // run(): Promise<void>;

  getUsers(): Promise<IUser[]>;

  getPosts(): Promise<IPost[]>;

  getPostLikes(post_id: string): Promise<ILike[]>;

  getLikes(): Promise<ILike[]>;

  createUser(user: IUser): Promise<any>

  createPost(post: IPost): Promise<any>;

  deletePost(post_id: string): Promise<any>

  createLike(like: ILike): Promise<any>;

  unLike(like_id: string): Promise<any>

  close(): Promise<any>


}

export class DBController extends BaseController implements IDBController {
  private client: MongoClient;
  private db: Db;
  likesCollection: Collection;
  postsCollection: Collection;
  usersCollection: Collection;

  constructor() {
    super();
  }

  async init(): Promise<void> {
    const This = this;

    return new Promise((resolve, reject) => {
      this.client = new MongoClient(config.URL, {
        useUnifiedTopology: true
      });

      this.client.connect(function(err) {
        if (err) {
          console.error('Mongo Err', err);
          return reject();
        }
        console.log('Connected successfully to Mongo');
        This.db = This.client.db(config.dbName);

        This.likesCollection = This.db.collection('likes');
        This.postsCollection = This.db.collection('posts');
        This.usersCollection = This.db.collection('users');

        resolve();
      });
    });
  }


  async getPosts(): Promise<IPost[]> {
    return this.postsCollection.find({}).toArray();
  }

  async getUsers(): Promise<IUser[]> {
    return this.usersCollection.find({}).toArray();
  }

  async getLikes(): Promise<ILike[]> {
    return this.likesCollection.find({}).toArray();
  }

  getPostLikes(post_id: string): Promise<ILike[]> {
    return this.likesCollection.find({'postLiked._id': post_id}).toArray();
  }

  async createLike(like: ILike): Promise<any> {
    return this.likesCollection.insertOne(like);
  }

  async unLike(like_id: string): Promise<any> {
    const
      likeId = new ObjectID(like_id),
      like = await this.likesCollection.deleteOne({_id: likeId});
    return like.result;
  }

  async createPost(post: IPost): Promise<any> {
    return this.postsCollection.insertOne(post);
  }


  async createUser(user: IUser): Promise<any> {
    try {
      return this.usersCollection.insertOne(user);
    } catch (e) {
      console.log(e);

    }

  }
  async deletePost(post_id: string): Promise<any> {
    try {
      const id = new ObjectID(post_id),
      postToDelete =  await this.postsCollection.deleteOne({_id: id} );

      return postToDelete.result
    }catch (e) {
      console.log(e);

    }
  }


  close(): Promise<any> {
    return this.client.close();
  }



}






