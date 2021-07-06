import {DBConfig} from 'ngx-indexed-db';

export const homePlayerKey = 'player';
export const homeSyncPlayerKey = 'sync-player';
export const dbConfig: DBConfig = {
  name: 'SkantMedia',
  version: 1,
  objectStoresMeta: [
    {
      store: homePlayerKey,
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'slug', keypath: 'slug', options: {unique: false}},
        {name: 'duration', keypath: 'duration', options: {unique: false}},
        {name: 'name', keypath: 'name', options: {unique: false}},
        {name: 'artist', keypath: 'artist', options: {unique: false}},
        {name: 'url', keypath: 'url', options: {unique: false}},
        {name: 'cover', keypath: 'cover', options: {unique: false}},
        {name: 'type', keypath: 'type', options: {unique: false}},
      ]
    },
    {
      store: homeSyncPlayerKey,
      storeConfig: {keyPath: 'slug', autoIncrement: true},
      storeSchema: [
        {name: 'slug', keypath: 'slug', options: {unique: false}},
      ]
    }
  ]
};

