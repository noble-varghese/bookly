import { UserModel } from '@bookly/database';
import { Request } from 'express';
import { DataLoaders } from './dataloaders';

export interface Context {
  user?: UserModel;
  req: Request;
  loaders: DataLoaders;
}