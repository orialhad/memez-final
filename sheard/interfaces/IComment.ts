import {IUser} from "./IUser";

export interface IComment {
    _id?: string;
    date: string;
    time:string
    content: string;
    userCommentedId: string;
    userCommented?: IUser;
    postCommentedId: string;
}
