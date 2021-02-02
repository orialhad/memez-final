import {ILike}    from './ILike';
import {IUser}    from './IUser';
import {IComment} from './IComment';

export interface IPost {
    _id?: string
    content: string
    postedBy_id: string
    postedBy?: IUser
    date: string
    time: string
    likes?: ILike[]
    comments?: IComment[]
    image?: string
}
