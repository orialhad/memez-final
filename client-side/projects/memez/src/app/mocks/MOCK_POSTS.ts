import {IPost} from '../../../../../../sheard/interfaces/IPost';
import {MOCK_USERS} from './MOCK_USERS';
import {MOCK_LIKES} from './MOCK_LIKES';

export const MOCK_POSTS: IPost[] = [
  {
    _id     : '1',
    postedBy: MOCK_USERS[0],
    content : 'I like pizza',
    date    : '1.1.2020',
    time    : '10:00',
    likes   : []
  },
  {
    _id     : '2',
    postedBy: MOCK_USERS[1],
    content : 'I like cola',
    date    : '11.11.2020',
    time    : '11:11',
    likes   : []
  },
  {
    _id     : '3',
    postedBy: MOCK_USERS[2],
    content : 'I hate mosquitoes',
    date    : '11.10.2020',
    time    : '12:36',
    likes   : []
  },
  {
    _id     : '4',
    postedBy: MOCK_USERS[1],
    content : 'I like bli bli',
    date    : '11.10.2020',
    time    : '12:36',
    likes   : []
  },
  {
    _id     : '4',
    postedBy: MOCK_USERS[2],
    content : 'I like bla bla bla bla bla bla',
    date    : '11.10.2020',
    time    : '12:36',
    likes   : []
  },
  {
    _id     : '5',
    postedBy: MOCK_USERS[0],
    content : 'Livnat is the Queen',
    date    : '05.05.2020',
    time    : '10:54',
    likes   : []
  },

];

