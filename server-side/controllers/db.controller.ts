// import * as mongoose from 'mongoose';
import * as dayjs from 'dayjs';
import {BaseController, IBaseController} from './base.controller';
import {Collection, Db, MongoClient, ObjectId} from 'mongodb';
import {IUser} from '../../projects/memez/src/app/types/interfaces/IUser';
import {IPost} from '../../projects/memez/src/app/types/interfaces/IPost';
import {ILike} from '../../projects/memez/src/app/types/interfaces/ILike';

import {config} from '../config/config';

const MongoClinet = require('mongodb').MongoClient();

export interface IDBController extends IBaseController {
  // run(): Promise<void>;

  getUsers(): Promise<IUser[]>;

  getPosts(): Promise<IPost[]>;

  getPostLikes(post_id: string): Promise<ILike[]>;

  getLikes(): Promise<ILike[]>;

  createUser(user: IUser): Promise<any>

  createPost(post: IPost): Promise<any>;

  createLike(like: ILike): Promise<any>;

  unLike(like: ILike): Promise<any>

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

  getPostLikes(post_id: string): Promise<ILike[]>{
    return this.likesCollection.find(x => x._id === post_id).toArray()
  }

  async createLike(like: ILike): Promise<any> {
    return this.likesCollection.insertOne(like);
  }

  async unLike(like: ILike): Promise<any> {
    return this.likesCollection.deleteOne(x => x._id === like._id);
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


  close(): Promise<any> {
    return this.client.close();
  }


}






