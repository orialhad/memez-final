import {ILike} from './ILike';
import {IUser} from "./IUser";

export interface IPost {
	_id?: string
	content: string
	postedBy:IUser
	date: string
	time: string
	likes?: ILike[]
}
