import {IMainController} from '../controllers/main.controller';
import {Request, Response} from 'express';
import * as bcrypt         from 'bcrypt'
import {IUser} from '../../client-side/projects/memez/src/app/types/interfaces/IUser';


export const loginHandler = async function(this: IMainController, req: Request, res: Response) {
    try {
        const
            login_user: IUser = await this.userController.getUserByUserName(req.body.userName);
        if (login_user) {
            const
                password: string = req.body.password,
                verify_pass = await bcrypt.compare(password, login_user.password);
            if(verify_pass){

            }
            return res.status(404).send({msg: 'WRONG PASSWORD !!!! '});
        }
        return res.status(404).send({msg: 'NO SUCH USER _ TRY AGAIN !!!!'});

    } catch (e) {
        res.status(400).send({msg: 'Something went wrong ): ): ): '});
    }
};
