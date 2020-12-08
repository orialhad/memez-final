import * as mongoose      from "mongoose";
import {Schema, Document} from "mongoose";
import {IUserModel}           from "./user.model";



export interface IPostModel extends Document {
  content: string
  postedBy: IUserModel
  date: string
  time: string

}


 const PostModel: Schema = new Schema({
  content : String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  date    : String,
  time    : String,

})




export default mongoose.model<IPostModel>('Post', PostModel)
