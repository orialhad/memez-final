//region imports
import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as bcrypt from 'bcrypt';
import {IMainController} from '../controllers/main.controller';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';
import {IMongoDBController, MongoDBController} from '../controllers/mongoDbcontroller';


const LocalStrategy = PassportLocal.Strategy;


//endregion

let mock_users =
        [
            {username: 'orial', password: '$2b$10$2PfxUfeV2DAYfvOAorumNudsUqJ2Lw4.AwzQ4BoqPWvZuRyLz6b5.'},
            {username: 'dani', password: '$2b$10$25HciLh1GqrRW/PelXJu.unQThh//Q.xOPcXg75HIYYfDuom/gXX6'}
        ];
// const users: Promise<IUser[]> =  MongoDBController.prototype.getUsers();


export const getLocalStrategy = (db: IMongoDBController) => new LocalStrategy(
    async (username, password, done) => {
        console.log('checking username123: ' + username);
        // const
        // users: IUser[] = await MongoDBController.prototype.getUsers();
        // console.log(users);

        const user = await db.getUserByName(username);

        console.log('checking username: ' + user.username);

        // const user = mock_users.find(user => user.username === username)

        if (!user) {
            console.log('ERROR: no user found');
            return done('unauthorized access', false);
        }
        if (await bcrypt.compare(password, user.password)) {
            done(null, user)
        } else {
            done('password mismatch')
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


