import {IPost} from './IPost';
import {ILike} from './ILike';

export interface IUser {
	_id?: string
	name: string
  avatar?: string
	posts?: IPost[]
	likes?: ILike[]
}
