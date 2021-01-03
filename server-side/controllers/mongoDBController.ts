import {BaseController, IBaseController} from './base.controller';
import {Collection, Db, GridFSBucket, MongoClient,} from 'mongodb';
import {IUser} from '../../sheard/interfaces/IUser';
import {IPost} from '../../sheard/interfaces/IPost';
import {ILike} from '../../sheard/interfaces/ILike';
import {config} from '../config/config';
// import {Grid} from 'gridfs-stream';

import Grid = require('gridfs-stream');
import {response} from 'express';

const fs = require('fs');

const
    mongo       = require('mongodb'),
    mongoClient = mongo.MongoClient(),
    ObjectID    = mongo.ObjectID;

// Grid = mongo.GridFSBucket


export interface IMongoDBController extends IBaseController {
    // run(): Promise<void>;
    // gfs: any;

    getUsers(): Promise<IUser[]>;

    getUser(id): Promise<IUser>;

    getUserByName(userName): Promise<IUser>;

    editProfilePic(id, avatar): Promise<any>

    getPosts(): Promise<IPost[]>;

    getPostLikes(post_id: string): Promise<ILike[]>;

    getLikes(): Promise<ILike[]>;

    createUser(user: IUser): Promise<any>

    createPost(post: IPost): Promise<any>;

    deletePost(post_id: string): Promise<any>

    createLike(like: ILike): Promise<any>;

    unLike(like_id: string): Promise<any>

    getFile(filename: string): Promise<any>

    getLastUpload(): Promise<any>

    close(): Promise<any>


}


export class MongoDBController extends BaseController implements IMongoDBController {
    private client: MongoClient;
    private db: Db;

    likesCollection: Collection;
    postsCollection: Collection;
    usersCollection: Collection;
    gfs;
    gridFSBucket;

    // uploadCollection: Collection;


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

                //This.gfs = Grid(This.db, This.client);
                This.gfs = Grid(This.db, mongo);
                This.gridFSBucket = new GridFSBucket(This.db, {bucketName: 'uploads'});

                This.likesCollection = This.db.collection('likes');
                This.postsCollection = This.db.collection('posts');
                This.usersCollection = This.db.collection('users');
                // This.uploadCollection = This.db.collection('upload');
                This.gfs.collection('uploads');

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

    async editProfilePic(id: string, avatar: string): Promise<any> {
        const _id = new ObjectID(id);
        return await this.usersCollection.updateOne(
            {_id: _id}, {$set: {avatar: avatar}});

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
        console.log();
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
        return new Promise((resolve, reject) => {
            this.gfs.files.findOne({filename: filename}, (err, file) => {
                if (file) {
                    const readstream = this.gridFSBucket.openDownloadStream(file._id);
                    resolve(readstream);
                } else {
                    reject();
                }
            });
        });
    }

    async getLastUpload() {
        return new Promise((resolve, reject) => {
            this.gfs.files.find({}).toArray((err, files) => {
                let lastFile = files.reduce((a, b) => (a.uploadDate > b.uploadDate ? a : b));
                const readstream = this.gridFSBucket.openDownloadStream(lastFile._id);
                resolve(readstream);
            });
        });
    }


    close(): Promise<any> {
        return this.client.close();
    }


}






