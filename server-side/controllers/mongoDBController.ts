import {BaseController, IBaseController} from './base.controller';
import {Collection, Db, GridFSBucket, MongoClient,} from 'mongodb';
import {IUser} from '../../sheard/interfaces/IUser';
import {IPost} from '../../sheard/interfaces/IPost';
import {ILike} from '../../sheard/interfaces/ILike';
import {config} from '../config/config';
import {IComment} from "../../sheard/interfaces/IComment";
// import {Grid} from 'gridfs-stream';
import Grid = require('gridfs-stream');

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

    getUserByEmail(email): Promise<IUser>;

    editProfilePic(id, avatar): Promise<any>

    getPosts(): Promise<IPost[]>;

    getPostLikes(post_id: string): Promise<ILike[]>;

    getUsersFor(user_id: string): Promise<IUser>

    getLikes(): Promise<ILike[]>;

    createUser(user: IUser): Promise<any>

    createPost(post: IPost): Promise<any>;

    deletePost(post_id: string): Promise<any>

    createLike(like: ILike): Promise<any>;

    unLike(like_id: string): Promise<any>;

    getFile(filename: string): Promise<any>;

    getPostsWithData(): Promise<IPost[]>;

    createComment(comment: IComment): Promise<any>;

    deleteComment(comment_id: string): Promise<any>

    getPostComments(comment_id: string): Promise<IComment[]>

    // getLastUpload(): Promise<any>

    close(): Promise<any>


    deletePostComments(post_id: string): Promise<any>;
}


export class MongoDBController extends BaseController implements IMongoDBController {
    private client: MongoClient;
    private db: Db;

    likesCollection: Collection;
    postsCollection: Collection;
    usersCollection: Collection;
    commentsCollection: Collection;
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

            this.client.connect(function (err) {
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
                This.commentsCollection = This.db.collection('comments');

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

    async getUserByEmail(email): Promise<IUser> {
        try {
            return await this.usersCollection.findOne({email});
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

    async getPostsWithData(): Promise<IPost[]> {
        const
            posts: IPost[] = await this.getPosts();
        return await Promise.all(
            posts.map(async post => {
                post.likes = await this.getPostLikes(post._id.toString());
                post.postedBy = await this.getUsersFor(post.postedBy_id);
                post.comments = await this.getPostComments(post._id.toString());
                return post;
            })
        );
    }


    async deletePost(post_id: string): Promise<any> {
        try {
            const id           = new ObjectID(post_id),
                  postToDelete = await this.postsCollection.deleteOne({_id: id});
            await this.deletePostLikes(post_id);
            await this.deletePostComments(post_id);
            return postToDelete.result;
        } catch (e) {
            console.error(e);

        }
    }
    async deletePostLikes(post_id: string): Promise<any> {
        try{
            return await this.likesCollection.deleteMany({'postLiked._id': post_id});
        }catch (e) {
            console.error(e)
        }

    }

    async deletePostComments(post_id: string): Promise<any> {
        return await this.commentsCollection.deleteMany({postCommentedId: post_id});
    }

    async getPostLikes(post_id: string): Promise<ILike[]> {
        return this.likesCollection.find({'postLiked._id': post_id}).toArray();
    }

    async getUsersFor(user_id: string): Promise<IUser> {
        const id = new ObjectID(user_id);
        return this.usersCollection.findOne({_id: id});
    }

    //likes
    async getLikes(): Promise<ILike[]> {
        return this.likesCollection.find({}).toArray();
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

    async createComment(comment: IComment): Promise<any> {
        return await this.commentsCollection.insertOne(comment)
    }

    async deleteComment(comment_id: string): Promise<any> {
        const
            commentId = new ObjectID(comment_id),
            comment   = await this.commentsCollection.deleteOne({_id: commentId});
        return comment.result;
    }

    async getPostComments(comment_id: string): Promise<IComment[]> {
        const
            comments: IComment[] = await this.commentsCollection.find({postCommentedId: comment_id}).toArray();
        return await Promise.all(
            comments.map(async comment => {
                comment.userCommented = await this.getUsersFor(comment.userCommentedId);
                return comment;
            })
        );


        // return this.commentsCollection.find({postCommentedId: comment_id}).toArray()
    }



    // async getLastUpload() {
    //     return new Promise((resolve, reject) => {
    //         this.gfs.files.find({}).toArray((err, files) => {
    //             let lastFile = files.reduce((a, b) => (a.uploadDate > b.uploadDate ? a : b));
    //             const readstream = this.gridFSBucket.openDownloadStream(lastFile._id);
    //             resolve(readstream);
    //         });
    //     });
    // }


    close(): Promise<any> {
        return this.client.close();
    }


}






