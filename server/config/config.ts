import {inProduction} from '../../client/projects/memez/src/app/config/config';

require('dotenv').config()

export const config = {
  URL : inProduction ?  process.env.MONGO_URI : 'mongodb://localhost:27017',
  port: process.env.PORT || 4300,
  dbName: `myApp2`
}
