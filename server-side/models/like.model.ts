import * as mongoose      from "mongoose";
import {Schema, Document} from "mongoose";
import {IUserModel}           from "./user.model";
import {IPostModel}           from "./post.model";



export interface ILikeModel extends Document {
  timestamp: string
  userLiked: IUserModel
  postLiked: IPostModel
}

 const LikeModel: Schema = new Schema({
  timestamp: String,
  userLiked: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Like'
  },
  postLiked: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Post'
  }
})


export default mongoose.model<ILikeModel>('Like', LikeModel)
