import * as HTTP from 'http';
import * as HTTPS from 'https';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {Express, Request, Response} from 'express';
import {BaseController, IBaseController} from './base.controller';
import * as events from 'events';
import {config} from '../config/config';

export interface IHttpController extends IBaseController {
  events: events.EventEmitter
}


export class HttpController extends BaseController implements IHttpController {
  app: Express = express();
  events: events.EventEmitter = new events.EventEmitter();


  constructor() {
    super();
  }

  async init() {

    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.registerEndpoints();
    await this.runServer();


  }

  async runServer() {
    await this.app.listen(config.port, () => {
      console.log(`server is up on port ${config.port} `);
    });
  }

  registerEndpoints() {

    //get all users
    this.app.get('/users', (req: Request, res: Response) => {
      this.events.emit('all_users', req, res);
    });
    // get specific user
    this.app.get('/users/:id', (req: Request, res: Response) => {
      this.events.emit('user', req, res);
    });
    //create new user
    this.app.post('/users', (req: Request, res: Response) => {
      this.events.emit('create_user', req, res);
    });
    //get all posts
    this.app.get('/posts', (req: Request, res: Response) => {
      this.events.emit('all_posts', req, res);
    });
    //get specific post
    this.app.get('/posts/:id', (req: Request, res: Response) => {
      this.events.emit('post', req, res);
    });
    //upload new post
    this.app.post('/posts', (req: Request, res: Response) => {
      this.events.emit('upload_post', req, res);
    });
    //delete post
    this.app.delete('/posts/:id', (req: Request, res: Response) => {
      this.events.emit('delete_post', req, res);
    });
    //get all likes
    this.app.get('/likes', (req: Request, res: Response) => {
      this.events.emit('all_likes', req, res);
    });
    //get specific like
    this.app.get('/likes/:id', (req: Request, res: Response) => {
      this.events.emit('like', req, res);
    });
    //create new like
    this.app.post('/likes', (req: Request, res: Response) => {
      this.events.emit('create_like', req, res);
    });
    //remove like
    this.app.delete('/likes/:id', (req: Request, res: Response) => {
      this.events.emit('delete_like', req, res);
    });

    //get post likes
    this.app.get('/likes/:post_id', (req: Request, res: Response) => {
      this.events.emit('post_likes', req, res);
    });
  }

}
