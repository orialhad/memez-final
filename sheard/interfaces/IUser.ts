import {IPost} from './IPost';
import {ILike} from './ILike';

export interface IUser {
    username: string;
    password: string;
    email?: string;
    _id?: string;
    name?: string
    dob?: string;
    avatar?: string;
    posts?: IPost[]
    likes?: ILike[]
}
