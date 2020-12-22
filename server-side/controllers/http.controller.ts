//region Imports
import * as express from 'express';
import {Express, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {BaseController, IBaseController} from './base.controller';
import * as events from 'events';
import {config} from '../config/config';


//endregion


export interface IHttpController extends IBaseController {
  events: events.EventEmitter
}


export class HttpController extends BaseController implements IHttpController {



  express_app: Express = express();
  events: events.EventEmitter = new events.EventEmitter();


  constructor() {
    super();
  }

  async init() {

    this.express_app.use(bodyParser.json());
    this.express_app.use(cors());

    this.registerEndpoints();
    await this.runServer();

  }

  async runServer() {
    await this.express_app.listen(config.port, () => {
      console.log(`server is up on port ${config.port} `);
    });
  }

  registerEndpoints() {

    //get all users
    this.express_app.get('/api/users', (req: Request, res: Response) => {
      this.events.emit('all_users', req, res);
    });
    // get specific user
    this.express_app.get('/api/users/:id', (req: Request, res: Response) => {
      this.events.emit('user', req, res);
    });
    //create new user
    this.express_app.post('/api/users', (req: Request, res: Response) => {
      this.events.emit('create_user', req, res);
    });
    //get all posts
    this.express_app.get('/api/posts', (req: Request, res: Response) => {
      this.events.emit('all_posts', req, res);
    });
    //get specific post
    this.express_app.get('/api/posts/:id', (req: Request, res: Response) => {
      this.events.emit('post', req, res);
    });
    //upload new post
    this.express_app.post('/api/posts', (req: Request, res: Response) => {
      this.events.emit('upload_post', req, res);
    });
    //delete post
    this.express_app.delete('/api/posts/:id', (req: Request, res: Response) => {
      this.events.emit('delete_post', req, res);
    });
    //get all likes
    this.express_app.get('/api/likes', (req: Request, res: Response) => {
      this.events.emit('all_likes', req, res);
    });
    //get specific like
    this.express_app.get('/api/likes/:id', (req: Request, res: Response) => {
      this.events.emit('like', req, res);
    });
    //create new like
    this.express_app.post('/api/likes', (req: Request, res: Response) => {
      this.events.emit('create_like', req, res);
    });
    //remove like
    this.express_app.delete('/api/likes/:id', (req: Request, res: Response) => {
      this.events.emit('delete_like', req, res);
    });

    //get post likes
    this.express_app.get('/api/likes/:post_id', (req: Request, res: Response) => {
      this.events.emit('post_likes', req, res);
    });

    //upload a file
    this.express_app.post('/api/photos', (req: Request, res: Response) => {
      this.events.emit('upload_file', req, res);
    });

    //login
    this.express_app.post('/api/login', (req: Request, res: Response) => {
      this.events.emit('login', req, res);
    });

    //logout
    this.express_app.post('/api/logout', (req: Request, res: Response) => {
      this.events.emit('logout', req, res);
    });

  }

}
