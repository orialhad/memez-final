//region imports
import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as bcrypt from 'bcrypt';
import {IMainController} from '../controllers/main.controller';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';


const LocalStrategy = PassportLocal.Strategy;


//endregion

let mock_users = [{username: 'orial', password: '$2b$10$2PfxUfeV2DAYfvOAorumNudsUqJ2Lw4.AwzQ4BoqPWvZuRyLz6b5.'}];





export const local_Strategy = new LocalStrategy(

    async function(username, password, done) {

        // console.log('checking username: ');
        // const
            // users: IUser[] = await This.userController.getUsers(),
            // user           = users.find(user => user.username === username);
        console.log('checking username: ' );

        const user = ""; //Get user from DB

        if (!mock_users[0]) {
            console.log('ERROR: no user found');
            return done('unauthorized access', false);
        }
        const validatePassword = async (password) => bcrypt.compare(password,mock_users[0].password );

        if (validatePassword(password)
            .then((isValid) => {
                console.log('Response of validatePassword: ' + isValid);
                if (!isValid) {
                    return done('unauthorized access: password problem', false);
                } else {
                    // all is well, return successful user
                    return done(null, mock_users[0]);
                }
            })
        ) {
            return done;
        }
    }
);

passport.serializeUser(function(user, done) {
    if (user) {
        done(null, user);
    }
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});


