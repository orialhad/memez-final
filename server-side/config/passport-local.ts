
import * as passport from 'passport';
import { IBaseController} from '../controllers/base.controller';
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';
const LocalStrategy = require('passport-local').Strategy;

     export const local_Strategy = new LocalStrategy(
        async function(this: IBaseController,userName, password, done,req,res) {
            const users:IUser[] =await this.main.userController.getUsers()
            console.log('checking username: ' + userName);
            users.find(user => user.userName === userName
                , async function(err, user) {
                    // if there are any errors, return the error before anything else
                    if (err) {
                        console.log('ERROR: ' + JSON.stringify(err));
                        return done(err, false);
                    }

                    // if no user is found, return the message
                    if (!user) {
                        console.log('ERROR: no user found');
                        return done('unauthorized access', false);
                    }

                    // if the user is found but the password is wrong
                    const validatePassword = (password) => this.authController.validatePassword(password,req,res)
                    if (validatePassword(password).then((isValid) => {
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
                });
        }
    );

    passport.serializeUser(function(user, done) {
        if (user) done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

