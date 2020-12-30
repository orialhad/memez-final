import {BaseController, IBaseController} from './base.controller';
import {Collection, Db, MongoClient,} from 'mongodb';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';
import {IPost} from '../../client-side/projects/memez/src/app/types/interfaces/IPost';

import {ILike} from '../../client-side/projects/memez/src/app/types/interfaces/ILike';
import {config} from '../config/config';
import * as GridFsStorage from 'multer-gridfs-storage';
// import {Grid} from 'gridfs-stream';
import {response} from 'express';

const
    mongo       = require('mongodb'),
    mongoClient = mongo.MongoClient(),
    ObjectID    = mongo.ObjectID,
    Grid        = mongo.GridFSBucketReadStream;


export interface IMongoDBController extends IBaseController {
    // run(): Promise<void>;

    getUsers(): Promise<IUser[]>;

    getUser(id): Promise<IUser>;

    getUserByName(userName): Promise<IUser>;

    getPosts(): Promise<IPost[]>;

    getPostLikes(post_id: string): Promise<ILike[]>;

    getLikes(): Promise<ILike[]>;

    createUser(user: IUser): Promise<any>

    createPost(post: IPost): Promise<any>;

    deletePost(post_id: string): Promise<any>

    createLike(like: ILike): Promise<any>;

    unLike(like_id: string): Promise<any>

    getFile(filename): Promise<any>

    close(): Promise<any>


}

export class MongoDBController extends BaseController implements IMongoDBController {
    private client: MongoClient;
    private db: Db;

    likesCollection: Collection;
    postsCollection: Collection;
    usersCollection: Collection;
    uploadCollection: Collection;
    gfs;


    constructor() {
        super();

        this.getUsers = this.getUsers.bind(this);

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
                This.uploadCollection = This.db.collection('upload.files');


                resolve();
            });
        });
    }

    //users
    async createUser(user: IUser): Promise<any> {
        try {
            return this.usersCollection.insertOne(user);
        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(): Promise<IUser[]> {
        return this.usersCollection.find({}).toArray();
    }

    async getUser(id): Promise<IUser> {
        const userId = new ObjectID(id);
        return await this.usersCollection.findOne({_id: userId});
    }

    async getUserByName(username): Promise<IUser> {
        try {
            return await this.usersCollection.findOne({username});
        } catch (err) {
            console.log('no such user ', err);
        }
        return;
    }


    //posts

    async createPost(post: IPost): Promise<any> {
        return await this.postsCollection.insertOne(post);
    }

    async getPosts(): Promise<IPost[]> {
        return this.postsCollection.find({}).toArray();
    }

    async deletePost(post_id: string): Promise<any> {
        try {
            const id           = new ObjectID(post_id),
                  postToDelete = await this.postsCollection.deleteOne({_id: id});
            await this.deletePostLikes(post_id);
            return postToDelete.result;
        } catch (e) {
            console.log(e);

        }
    }

    //likes
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
            like   = await this.likesCollection.deleteOne({_id: likeId});
        return like.result;
    }

    async deletePostLikes(post_id: string): Promise<any> {
        return await this.likesCollection.deleteMany({'postLiked._id': post_id});
    }


    async getFile(filename): Promise<any> {
        console.log('im here '+ filename);
        return await this.uploadCollection.findOne({filename:filename})

        // this.gfs = new Grid;
        // const readstream = this.gfs.createReadStream("cec2f6ec4ac0368041609b597c28b267.png");
        // readstream.pipe(response);
        // console.log(`get file `,readstream);

    }


    close(): Promise<any> {
        return this.client.close();
    }


}






