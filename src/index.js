import dotenv from 'dotenv';

dotenv.config();

import AWSConfig from './config/AWS.js';
import express from 'express';
import createItem from './controller/createItem.js';
import findItem from './controller/findItem.js';
import updateItem from './controller/updateItem.js';
import deleteItem from './controller/deleteItem.js';

const app = express();

AWSConfig();

app.use(express.json());

app
  .get('/', findItem)
  .post('/', updateItem)
  .put('/', createItem)
  .delete('/', deleteItem)

app.listen(3000);