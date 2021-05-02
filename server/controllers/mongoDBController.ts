//region imports
import {BaseController, IBaseController}            from './base.controller';
import {Collection, Db, GridFSBucket, MongoClient,} from 'mongodb';
import {IUser}                                      from '../../sheard/interfaces/IUser';
import {IPost}                                      from '../../sheard/interfaces/IPost';
import {ILike}                                      from '../../sheard/interfaces/ILike';
import {config}                                     from '../config/config';
import {IComment}                                   from '../../sheard/interfaces/IComment';
import Grid = require('gridfs-stream');
//endregion


const
    mongo       = require('mongodb'),
    mongoClient = mongo.MongoClient(),
    ObjectID    = mongo.ObjectID;


export interface IMongoDBController extends IBaseController {
    //USERS

    createUser(user: IUser): Promise<any>

    getUserById(id): Promise<IUser>;

    getUserByName(userName): Promise<IUser>;

    getUserByEmail(email): Promise<IUser>;

    editProfilePic(id, avatar): Promise<any>

    editEmail(id: string, email: string): Promise<any>;

    //POSTS

    getPosts(): Promise<IPost[]>;

    getPostsWithData(): Promise<IPost[]>;

    createPost(post: IPost): Promise<any>;

    deletePost(post_id: string): Promise<any>

    getPostLikes(post_id: string): Promise<ILike[]>;

    deletePostLikes(post_id: string): Promise<any>;

    getPostComments(comment_id: string): Promise<IComment[]>;

    deletePostComments(post_id: string): Promise<any>;

    // LIKES

    createLike(like: ILike): Promise<any>;

    unLike(like_id: string): Promise<any>;

    // UPLOAD

    getFile(filename: string): Promise<File>;

    // COMMENTS

    createComment(comment: IComment): Promise<any>;

    deleteComment(comment_id: string): Promise<any>


    close(): Promise<any>


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
                This.db           = This.client.db(config.dbName);
                This.gfs          = Grid(This.db, mongo);
                This.gridFSBucket = new GridFSBucket(This.db, {bucketName: 'uploads'});

                This.likesCollection    = This.db.collection('likes');
                This.postsCollection    = This.db.collection('posts');
                This.usersCollection    = This.db.collection('users');
                This.commentsCollection = This.db.collection('comments');
                This.gfs.collection('uploads');

                resolve();
            });
        });
    }

    // MongoDB controllers !

    //users

    async createUser(user: IUser): Promise<any> {
        try {
            return this.usersCollection.insertOne(user);
        } catch (e) {
            console.log('createUser: ', e);
        }
        return;
    }


    async getUserById(id): Promise<IUser> {
        try {
            const userId = new ObjectID(id);
            return await this.usersCollection.findOne({_id: userId});
        } catch (e) {
            console.log('getUserById: ', e);
        }
        return;
    }

    async getUserByName(username): Promise<IUser> {
        try {
            return await this.usersCollection.findOne({username: username});
        } catch (e) {
            console.log('getUserByName: ', e);
        }
        return;
    }

    async getUserByEmail(email: string): Promise<IUser> {
        try {
            return await this.usersCollection.findOne({email: email});
        } catch (e) {
            console.log('getUserByEmail: ', e);
        }
        return;
    }

    async editProfilePic(id: string, avatar: string): Promise<any> {
        try {
            const _id = new ObjectID(id);
            return await this.usersCollection.updateOne(
                {_id: _id},
                {$set: {avatar: avatar}});
        } catch (e) {
            console.log('editProfilePic: ', e);
        }

    }

    async editEmail(id: string, email: string): Promise<any> {
        try {
            const _id = new ObjectID(id);
            return await this.usersCollection.updateOne(
                {_id: _id},
                {$set: {email: email}});
        } catch (e) {
            console.log('editEmail:  ', e);
        }
    }

    //posts
    async getPosts(): Promise<IPost[]> {
        try {
            return this.postsCollection.find({}).toArray();
        } catch (e) {
            console.log('get posts: ', e);
        }
    }

    async getPostsWithData(): Promise<IPost[]> {
        try {
            const posts: IPost[] = await this.getPosts();
            return await Promise.all(
                posts.map(async post => {
                    post.likes             = await this.getPostLikes(post._id.toString());
                    post.postedBy          = await this.getUserById(post.postedBy_id);
                    post.postedBy.password = '';
                    post.comments          = await this.getPostComments(post._id.toString());
                    return post;
                })
            );
        } catch (e) {
            console.log('getPostsWithData: ', e);
        }
    }

    async createPost(post: IPost): Promise<any> {
        try {
            return await this.postsCollection.insertOne(post);
        } catch (e) {
            console.log('createPost: ', e);
        }
    }

    async deletePost(post_id: string): Promise<any> {
        try {
            const id = new ObjectID(post_id);
            await this.deletePostLikes(post_id);
            await this.deletePostComments(post_id);
            return await this.postsCollection.deleteOne({_id: id});
        } catch (e) {
            console.log('deletePost: ', e);
        }
    }

    async getPostLikes(post_id: string): Promise<ILike[]> {
        try {
            return this.likesCollection.find({postLiked: post_id}).toArray();
        } catch (e) {
            console.log('getPostLikes: ', e);
        }
    }

    async deletePostLikes(post_id: string): Promise<any> {
        try {
            return await this.likesCollection.deleteMany({postLiked: post_id});
        } catch (e) {
            console.log('deletePostLikes: ', e);
        }

    }

    async getPostComments(comment_id: string): Promise<IComment[]> {
        try {
            const
                comments: IComment[] = await this.commentsCollection.find({postCommentedId: comment_id}).toArray();
            return await Promise.all(
                comments.map(async comment => {
                    let user              = await this.getUserById(comment.userCommentedId);
                    user.password         = '';
                    comment.userCommented = user;
                    return comment;
                })
            );
        } catch (e) {
            console.log('getPostComments: ', e);
        }
    }

    async deletePostComments(post_id: string): Promise<any> {
        try {
            return await this.commentsCollection.deleteMany({postCommentedId: post_id});
        } catch (e) {
            console.log('deletePostComments: ', e);
        }
    }

    //likes

    async createLike(like: ILike): Promise<any> {
        try {
            return this.likesCollection.insertOne(like);
        } catch (e) {
            console.log('createLike: ', e);
        }
    }

    async unLike(like_id: string): Promise<any> {
        try {
            const
                likeId = new ObjectID(like_id),
                like   = await this.likesCollection.deleteOne({_id: likeId});
            return like.result;
        } catch (e) {
            console.log('unLike: ', e);
        }

    }

    // UPLOAD

    async getFile(filename): Promise<any> {
        try {
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
        } catch (e) {
            console.log('getFile: ', e);
        }
    }


    //COMMENTS


    async createComment(comment: IComment): Promise<any> {
        try {
            return await this.commentsCollection.insertOne(comment);
        } catch (e) {
            console.log('createComment: ', e);
        }

    }

    async deleteComment(comment_id: string): Promise<any> {
        try {
            const
                commentId = new ObjectID(comment_id),
                comment   = await this.commentsCollection.deleteOne({_id: commentId});
            return comment.result;
        } catch (e) {
            console.log('deleteComment: ', e);
        }
    }


    close(): Promise<any> {
        return this.client.close();
    }


}






