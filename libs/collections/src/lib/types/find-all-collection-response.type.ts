import { IPageInfo } from '@app/common';
import { ICollection } from '../interfaces';

export type FindAllCollections = { collections: Array<ICollection>; pageInfo: IPageInfo };
