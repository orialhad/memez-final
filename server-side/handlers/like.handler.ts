import {Request, Response} from 'express';
import {IMainController} from '../controllers/main.controller';
import {ILike} from '../../projects/memez/src/app/types/interfaces/ILike';
import * as dayjs          from "dayjs";


export const getLikesHandler = async function(this: IMainController, req: Request, res: Response) {
  try {
    const likes = await this.likeController.getLikes();
    return res.send(likes);

  } catch (e) {
    return res.status(404).send({msg: 'like has not found' + e});
  }
};


// Create new like
export const createLikeHandler = async function(this: IMainController, req: Request, res: Response) {
  const like: ILike = {
    userLiked : req.body.userLiked,
    postLiked : req.body.postLiked,
    timestamp : dayjs().format(`DD.MM.YY ` +`HH:mm:ss` )
  };
  try {
    const
      newLike = await this.likeController.createLike(like);
    return res.json(newLike).end();


  } catch (e) {
    return res.status(404).json({msg: 'No like added'} + e);
  }


};
// Unlike post
export const unLikeHandler = async function (this: IMainController, req: Request, res: Response) {
  try {
    const deletedLike = await this.likeController.unLike(req.params.id)
    res.json(deletedLike).end()
  } catch (e) {
    res.status(404).json({msg: 'like was not deleted ' + e})
  }
}

