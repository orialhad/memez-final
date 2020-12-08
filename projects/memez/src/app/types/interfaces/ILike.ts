import {IUser} from "./IUser";
import {IPost} from "./IPost";

export interface ILike {
  _id: string
  timestamp: string
  userLiked: IUser
  postLiked: IPost
}
