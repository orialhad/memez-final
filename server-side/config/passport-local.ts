//region imports
import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as bcrypt from 'bcrypt';
import {IMongoDBController} from '../controllers/mongoDbcontroller';
import {IUser} from "../../sheard/interfaces/IUser";


const LocalStrategy = PassportLocal.Strategy;


//endregion



export const getLocalStrategy = (db: IMongoDBController) => new LocalStrategy(
    async (username, password, done) => {
        let re = /\S+@\S+\.\S+/,
              user:IUser;
        re.test(username) ?  user = await db.getUserByEmail(username):  user = await db.getUserByName(username)
        if (!user) {
            // console.log('ERROR: no user found');
            return done('unauthorized access', false);
        }
        // console.log('checking username: ' + user.username);
        if (await bcrypt.compare(password, user.password)) {
            done(null, user)
        } else {
            done('unauthorized access',false)
        }
    }
);

export const isLoggedIn = (req, res,next)=>{
    // console.log('session ', req.session);
    if (req.isAuthenticated()) {
        return  next();
    }
    return res.status(400).json({'statusCode': 400, "message": "not authenticated"})
}

passport.serializeUser(function (user, done) {
    console.log('yo yo yo  ', user)
    if (user) done(null, user);

});

passport.deserializeUser(function (user, done) {
    console.log('bla bla bla ')
    done(null, user);
});




export const auth = ()=> {
    return (req, res, next) => {
        // console.log('Authenticating... (username and password)');
        passport.authenticate('local', (error, user, info) => {
            // console.log('B4: ' + JSON.stringify(user));
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
