import {Request, Response} from 'express';
import {IMainController} from '../controllers/main.controller';
import dayjs = require('dayjs');
import {IPost} from '../../client-side/projects/memez/src/app/types/interfaces/IPost';



export const getPostsHandler = async function(this: IMainController, req: Request, res: Response) {
  try {
    const
      posts = await this.postController.getPosts(),
      postsWithLikes = await Promise.all(
          posts.map(async post => {
            post.likes =  await this.likeController.getPostLikes(post._id.toString())
            return post
          })
        );
    return res.send(postsWithLikes);
  } catch (err) {
    return res.status(404).send({msg: 'get posts was unsuccessful ' + err});
  }
};


//creat a new post
export const createPostHandler = async function(this: IMainController, req: Request, res: Response) {
  const post: IPost = {
    content: req.body.content,
    postedBy: req.body.postedBy,
    date: dayjs().format(`DD.MM.YY`),
    time: dayjs().format(`HH:mm.ss`),
    likes: []
  };
  try {
    const
      newPost = await this.postController.createPost(post);
    return res.json(newPost).end();
  } catch
    (err) {


    return res.status(404).json({msg: 'No post added' + err});
  }
};

//delete post
export const deletePostHandler = async function(this: IMainController, req: Request, res: Response) {
  try {
    const postToDelete = await this.postController.deletePost(req.params.id);
    return res.send(postToDelete);
  } catch (e) {
    return res.status(404).send({msg: 'post was not deleted ' + e});
  }

};
