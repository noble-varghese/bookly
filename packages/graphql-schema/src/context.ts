import { UserModel } from '@bookly/database';
import { Request } from 'express';
import DataLoader from 'dataloader';

export interface Context {
  user?: UserModel;
  req: Request;
  loaders: {};
}