import * as mongoose      from "mongoose";
import {Schema, Document} from "mongoose";


export interface IUserModel extends Document {
  name: IUserModel
}

 const UserModel: Schema = new Schema({
  name: String,

})


export default mongoose.model<IUserModel>('User', UserModel)

