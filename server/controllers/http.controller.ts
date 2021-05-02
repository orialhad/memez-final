//region Imports
import * as express                                    from 'express';
import {Express, Request, Response}                    from 'express';
import * as bodyParser                                 from 'body-parser';
import * as cors                                       from 'cors';
import {BaseController, IBaseController}               from './base.controller';
import * as events                                     from 'events';
import {config}                                        from '../config/config';
import * as passport                                   from 'passport';
import {auth, getLocalStrategy}                        from '../config/passport-local';
import * as session                                    from 'express-session';
// socket.io
import * as socketio                                   from 'socket.io';
import {Server as IOServer, Socket as SocketIO_Socket} from 'socket.io';
import * as http                                       from 'http';
import {event_mapper}                                  from '../handlers/socket/event-mapper';
import expressSanitizer = require('express-sanitizer');


//endregion


export interface IHttpController extends IBaseController {
    events: events.EventEmitter
    express_app: Express
}


export class HttpController extends BaseController implements IHttpController {
    private sockets: SocketIO_Socket[] = [];
    private io_server: IOServer;
    private http_server: http.Server;

    express_app: Express        = express();
    events: events.EventEmitter = new events.EventEmitter();

    constructor() {
        super();
    }


    async init() {
        this.express_app.use(session({
            secret           : 'blahblahblah',
            resave           : false,
            saveUninitialized: true,
            cookie           : {maxAge: 6000000}
        }));
        this.express_app.use(bodyParser.urlencoded({extended: false}));
        this.express_app.use(bodyParser.json());
        this.express_app.use(cors());
        this.express_app.use(passport.initialize());
        this.express_app.use(passport.session());
        this.express_app.use(expressSanitizer());

        passport.use(getLocalStrategy(this.main.mongoDbController));

        this.registerEndpoints();
        this.http_server = this.runServer();
        this.initSocketIO();


    }

    initSocketIO() {
        const This = this;

        // @ts-ignore
        this.io_server = socketio(this.http_server);

        this.io_server.on('connection', function(socket: SocketIO_Socket) {
            This.sockets.push(socket);
            const idx = This.sockets.indexOf(socket);
            console.log(`SOCKET CONNECTED to slot ${idx}. Total ${This.sockets.length - 1} clients connected`);
            console.log(socket.connected, 'socket.connected');

            socket.on('disconnected', () => {
                This.sockets.splice(idx, 1);
                console.log(`SOCKET CONNECTED to slot ${idx}. Total ${This.sockets.length - 1} clients connected`);
            });

            Object
                .entries(event_mapper)
                .forEach(([event, fn]) => {
                    socket.on(event, fn.bind(This, socket));
                });
        });


    }

    runServer(): http.Server {
        return this.express_app.listen(config.port, () => {
            console.log(`server is up on port ${config.port} `);
        });
    }


    registerEndpoints() {

        //login
        this.express_app.post('/api/auth/login', auth(), (req: Request, res: Response) => {
            res.status(200).json({'statusCode': 200, 'user': req.user});
        });
        //logout
        this.express_app.get('/api/logout', (req, res) => {
            this.events.emit('logout', req, res);
        });
        //create new user
        this.express_app.post('/api/auth/signup', (req: Request, res: Response) => {
            this.events.emit('signup', req, res);
        });
        // upload a file
        this.express_app.post('/api/uploads', (req: Request, res: Response,) => {
            this.events.emit('upload_file', req, res);
        });
        // get a file
        this.express_app.get('/api/image/:filename', (req: Request, res: Response,) => {
            this.events.emit('get_file', req, res);
        });

        //  AJAX (old) EVENTS

        // //get all users
        // this.express_app.get('/api/users', (req: Request, res: Response) => {
        //     this.events.emit('all_users', req, res);
        // });
        // // get specific user
        // this.express_app.get('/api/users/:id', (req: Request, res: Response) => {
        //     this.events.emit('user', req, res);
        // });
        // get current user
        // this.express_app.get('/api/current_user', (req: Request, res: Response) => {
        //     console.log('3', req.session);
        //     this.events.emit('get_current', req, res);
        // });
        // //egit profile pic
        // this.express_app.post('/api/editProfilePic/:id', (req: Request, res: Response) => {
        //     this.events.emit('edit_profile_pic', req, res);
        // });
        // //get all posts
        // this.express_app.get('/api/posts', (req: Request, res: Response) => {
        //     this.events.emit('all_posts', req, res);
        // });
        // //get specific post
        // this.express_app.get('/api/posts/:id', (req: Request, res: Response) => {
        //     this.events.emit('post', req, res);
        // });
        // //upload new post
        // this.express_app.post('/api/posts', (req: Request, res: Response) => {
        //     this.events.emit('upload_post', req, res);
        // });
        // //delete post
        // this.express_app.delete('/api/posts/:id', (req: Request, res: Response) => {
        //     this.events.emit('delete_post', req, res);
        // });
        // //get all likes
        // this.express_app.get('/api/likes', (req: Request, res: Response) => {
        //     this.events.emit('all_likes', req, res);
        // });
        // //get specific like
        // this.express_app.get('/api/likes/:id', (req: Request, res: Response) => {
        //     this.events.emit('like', req, res);
        // });
        // //create new like
        // this.express_app.post('/api/likes', (req: Request, res: Response) => {
        //     this.events.emit('create_like', req, res);
        // });
        // //remove like
        // this.express_app.delete('/api/likes/:id', (req: Request, res: Response) => {
        //     this.events.emit('delete_like', req, res);
        // });
        //
        // //get post likes
        // this.express_app.get('/api/likes/:post_id', (req: Request, res: Response) => {
        //     this.events.emit('post_likes', req, res);
        // });
    }


}
