import {Request, Response} from 'express';
import {IMainController} from '../controllers/main.controller';
import dayjs = require('dayjs');
import {IPost} from '../../projects/memez/src/app/types/interfaces/IPost';
import {async} from 'rxjs/internal/scheduler/async';
import {ILike} from '../../projects/memez/src/app/types/interfaces/ILike';



export const getPostsHandler = async function(this: IMainController, req: Request, res: Response) {
  try {
    const
      posts = await this.postController.getPosts();
      // postsWithLikes = Promise.all(posts.map(async post => post.likes.push( await this.likeController.getPostLikes(post._id)))) ;
    // console.log(`show me the money:`, await this.likeController.getPostLikes(posts[0]._id))
    return  res.send(posts);



  } catch (err) {
    return res.status(404).send({msg: 'get posts was unsuccessful ' + err});
  }
};



//creat a new post
export const createPostHandler = async function(this: IMainController, req: Request, res: Response) {
  const post: IPost = {
    content: req.body.content,
    postedBy: req.body.postedBy,
    date: req.body.date,
    time: req.body.time,
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

// //delete post
// export const deletePostHandler = async function(this: IMainController, req: Request, res: Response) {
//   try {
//     const postToDelete = await this.postController.deletePost(req.params.id);
//     return res.send(postToDelete);
//   } catch (e) {
//     return res.status(404).send({msg: 'post was not deleted ' + e});
//   }
//
// };
