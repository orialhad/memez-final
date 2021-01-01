//region Imports
import * as express from 'express';
import {Express, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {BaseController, IBaseController} from './base.controller';
import * as events from 'events';
import {config} from '../config/config';
import * as passport from 'passport';
import {getLocalStrategy} from '../config/passport-local';
import session = require('express-session');
import expressSanitizer = require('express-sanitizer');


// socket.io
import {Server as IOServer, Socket as SocketIO_Socket} from "socket.io";
import * as http from 'http';
import * as socketio from "socket.io";
//endregion



export interface IHttpController extends IBaseController {
    events: events.EventEmitter
    express_app: Express
}


export class HttpController extends BaseController implements IHttpController {
    private sockets: SocketIO_Socket[] = [];
    private io_server: IOServer;
    private http_server: http.Server;

    express_app: Express = express();
    events: events.EventEmitter = new events.EventEmitter();

    constructor() {
        super();
    }

    async init() {
        // this.express_app.use(session({secret: 'blahblahblah', resave: true, saveUninitialized: true }));
        this.express_app.use(bodyParser.urlencoded({extended: false}));
        this.express_app.use(bodyParser.json());
        this.express_app.use(cors());
        this.express_app.use(passport.initialize());
        this.express_app.use(passport.session());
        // this.express_app.use(expressSanitizer());
        passport.use(getLocalStrategy(this.main.mongoDbController));

        this.registerEndpoints();


        this.http_server = this.runServer();
        this.initSocketIO();


    }

    initSocketIO() {
        const This = this;

        // @ts-ignore
        this.io_server = socketio(this.http_server);


        this.io_server.on('connection',function (socket: SocketIO_Socket) {
            This.sockets.push(socket)
            const idx = This.sockets.indexOf(socket)
            socket.send('Hi There How R U today ? ')
            console.log(`SOCKET CONNECTED to slot ${idx}. Total ${This.sockets.length} clients connected`);
            console.log(socket.connected,'socket.connected');

            socket.on('disconnected',()=>{
                This.sockets.splice(idx,1);
                console.log(`SOCKET CONNECTED to slot ${idx}. Total ${This.sockets.length} clients connected`);
            })

            socket.on('ping',()=>{
                console.log('pong');
            })
        })


    }
    runServer(): http.Server {
        return this.express_app.listen(config.port, () => {
            console.log(`server is up on port ${config.port} `);
        })
    }


    auth() {
        return (req, res, next) => {
            console.log('Authenticating... (username and password)');
            passport.authenticate('local', (error, user, info) => {
                console.log('B4: ' + JSON.stringify(user));
                if (error) {
                    res.status(400).json({'statusCode': 400, 'message': error});
                }
                req.login(user, function(error) {
                    if (error) {
                        return next(error);
                    }
                    next();
                });
            })(req, res, next);
        };
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
        // get current user
        this.express_app.get('/api/users/:id', (req: Request, res: Response) => {
            this.events.emit('get_current', req, res);
        });
        //create new user
        this.express_app.post('/api/auth/signup', (req: Request, res: Response) => {
            this.events.emit('signup', req, res);
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

        // upload a file
        this.express_app.post('/api/uploads', (req: Request, res: Response,) => {
            this.events.emit('upload_file', req, res);

        });
        // get a file
        this.express_app.get('/api/image/:filename', (req: Request, res: Response,) => {
            this.events.emit('get_file', req, res);
        });

        //login
        this.express_app.post('/api/auth/login', this.auth(), (req: Request, res: Response) => {
            // this.events.emit('login', req, res);
            res.status(200).json({'statusCode': 200, 'user': req.user});
        });

        //logout
        this.express_app.get('/api/logout', (req: Request, res: Response) => {
            // req.logout()
            this.events.emit('logout', req, res);
        });

    }


}
