//region imports
import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as bcrypt from 'bcrypt';
import {IMainController} from '../controllers/main.controller';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';
import {IMongoDBController, MongoDBController} from '../controllers/mongoDbcontroller';


const LocalStrategy = PassportLocal.Strategy;


//endregion



export const getLocalStrategy = (db: IMongoDBController) => new LocalStrategy(
    async (username, password, done) => {
        const user = await db.getUserByName(username);
        if (!user) {
            console.log('ERROR: no user found');
            return done('unauthorized access', false);
        }
        console.log('checking username: ' + user.username);
        if (await bcrypt.compare(password, user.password)) {
            done(null, user)
        } else {
            done('unauthorized access',false)
        }
    }
);


passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user);
    }
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});


