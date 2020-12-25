//region imports
import * as passport from 'passport';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';

import {IMainController} from "../controllers/main.controller";

import * as PassportLocal from 'passport-local';
const LocalStrategy = PassportLocal.Strategy;
//endregion


export const local_Strategy = new LocalStrategy(
    async function (this: IMainController, userName, password, done) {
        console.log('strategy');
        const
            users: IUser[] = await this.main.userController.getUsers(),
            user           = users.find(user => user.userName === userName);

        console.log('checking username: ' + userName);

        if (!user) {
            console.log('ERROR: no user found');
            return done('unauthorized access', false);
        }

        const validatePassword = (password) => this.authController.validatePassword(userName, password)

        if (validatePassword(password)
            .then((isValid) => {
                console.log('Response of validatePassword: ' + isValid);
                if (!isValid) {
                    return done('unauthorized access: password problem', false);
                } else {
                    // all is well, return successful user
                    return done(null, user);
                }
            })) {
            return done;
        }
    }
);

passport.serializeUser(function (user, done) {
    if (user) done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});

