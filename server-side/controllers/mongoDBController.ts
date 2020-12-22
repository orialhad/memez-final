import * as dayjs from 'dayjs';
import {BaseController, IBaseController} from './base.controller';
import {Collection, Db, MongoClient, ObjectId,} from 'mongodb';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';
import {IPost} from '../../client-side/projects/memez/src/app/types/interfaces/IPost';
import {ILike} from '../../client-side/projects/memez/src/app/types/interfaces/ILike';

import {config} from '../config/config';

const
    MongoClinet = require('mongodb').MongoClient(),
    ObjectID = require('mongodb').ObjectID;

// gridFS = require('gridfs');

export interface IMongoDBController extends IBaseController {
    // run(): Promise<void>;

    getUsers(): Promise<IUser[]>;

    getUser(id): Promise<IUser>;

    getUserByUserName(userName): Promise<IUser>;

    getPosts(): Promise<IPost[]>;

    getPostLikes(post_id: string): Promise<ILike[]>;

    getLikes(): Promise<ILike[]>;

    createUser(user: IUser): Promise<any>

    createPost(post: IPost): Promise<any>;

    deletePost(post_id: string): Promise<any>

    createLike(like: ILike): Promise<any>;

    unLike(like_id: string): Promise<any>

    uploadPhoto(photo: any): Promise<any>

    close(): Promise<any>


}

export class MongoDBController extends BaseController implements IMongoDBController {
    private client: MongoClient;
    private db: Db;
    likesCollection: Collection;
    postsCollection: Collection;
    usersCollection: Collection;
    photosCollection: Collection;

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
                This.photosCollection = This.db.collection(`photos`);

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
    async getUser(id): Promise<IUser> {
        const userId = new ObjectID(id)
        return await this.usersCollection.findOne({_id :userId});
    }

    async getUserByUserName(userName): Promise<IUser> {
        return await this.usersCollection.findOne({userName});
    }

    async getLikes(): Promise<ILike[]> {
        return this.likesCollection.find({}).toArray();
    }

   async getPostLikes(post_id: string): Promise<ILike[]> {
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
        return await this.postsCollection.insertOne(post);
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
                postToDelete = await this.postsCollection.deleteOne({_id: id});
                // relevantLikesToDelete = await this.likesCollection.deleteMany({'postLiked[_id]': id});
            return postToDelete.result;


        } catch (e) {
            console.log(e);

        }
    }

    uploadPhoto(photo: any): Promise<any> {
        return this.photosCollection.insertOne(photo);
    }


    close(): Promise<any> {
        return this.client.close();
    }


}






