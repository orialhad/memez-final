import {Request, Response} from "express"
import {IMainController}   from "../controllers/main.controller";
import {ILikeModel}            from "../models/like.model";




export const getAllLikesHandler = async function (this: IMainController, req: Request, res: Response) {
  try {
    const likes = await this.likeController.getAllLikes()
    return res.send(likes);

  } catch (e) {
    return res.status(404).send({msg: 'like has not found' + e})
  }
}
// Get specific like
export const getLikeByIdHandler = async function (this: IMainController, req: Request, res: Response) {
  try {
    const like = await this.likeController.getLikeById(req.params.id)

    return res.json(like).end()

  } catch (e) {
    res.status(404).send({msg: 'like was not found'})
  }

}

// Create new like
export const createLikeHandler = async function (this: IMainController, req: Request, res: Response) {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;

  try {
    const
      newLike = await this.likeController.createLike(user_id, post_id);


    return res.json(newLike).end()


  } catch (e) {
    return res.status(404).json({msg: 'No like added'})
  }


}

// Unlike post
export const removeLikeHandler = async function (this: IMainController, req: Request, res: Response) {
  try {
    const deletedLike = await this.likeController.removeLike(req.params.id)

    res.json(deletedLike).end()
  } catch (e) {
    res.status(404).json({msg: 'like was not deleted ' + e})
  }

}

export const getPostFromLikeHandler = async function (this: IMainController, req: Request, res: Response) {
  try {
    const postLikes: ILikeModel[] = await this.likeController.getPostFromLike(req.params.post_id)
    console.log(postLikes)


    res.json(postLikes).end();
  } catch (e) {
    res.status(404).json({msg: `likes was not found ${e} `}).end()
  }
}
