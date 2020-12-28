import {ILike} from '../types/interfaces/ILike';
import {MOCK_USERS} from './MOCK_USERS';
import {MOCK_POSTS} from './MOCK_POSTS';

let user1 = MOCK_USERS[0];

export const MOCK_LIKES: ILike[] = [
  {
    _id      : '1',
    timestamp: `30.01.2020`,
    userLiked: MOCK_USERS[0],
    postLiked: MOCK_POSTS[1]
  },
  // {
  //   _id       : '2',
  //   timestamp: '22.02.2020',
  //   userLiked  : MOCK_USERS[0],
  //   postLiked  : MOCK_POSTS[2]
  // },
  // {
  //   _id       : '3',
  //   timestamp: '29.03.2020',
  //   userLiked  : MOCK_USERS[1],
  //   postLiked : MOCK_POSTS[0]
  // }

];

