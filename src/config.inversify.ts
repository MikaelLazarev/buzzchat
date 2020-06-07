/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Container} from 'inversify';

// Chats
import {TYPES} from './types';
import {ChatsRepositoryI, ChatsServiceI} from './core/chat';
import {MessagesRepository} from './repository/messagesRepository';
import {ChatsController} from './controllers/chatsController';
import {ChatsService} from './services/chatsService';

import {ProfilesRepositoryI, ProfilesServiceI} from './core/profiles';
import {ProfilesRepository} from './repository/profilesRepository';
import {ProfilesService} from './services/profilesService';
import {ProfilesController} from './controllers/profilesController';

import {UsersServiceI} from './core/users';
import {UsersService} from './services/usersService';
import {UsersController} from './controllers/usersController';
import {ChatsRepository} from './repository/chatsRepository';
import {MessagesRepositoryI} from './core/message';
import {UserWebAuthController} from './controllers/userWebAuthController';

let container = new Container();

// CHATS
container
  .bind<ChatsRepositoryI>(TYPES.ChatsRepository)
  .to(ChatsRepository)
  .inSingletonScope();
container
  .bind<MessagesRepositoryI>(TYPES.MessagesRepository)
  .to(MessagesRepository)
  .inSingletonScope();
container.bind<ChatsServiceI>(TYPES.ChatsService).to(ChatsService);
container.bind<ChatsController>(TYPES.ChatsController).to(ChatsController);

// PROFILES
container
  .bind<ProfilesRepositoryI>(TYPES.ProfilesRepository)
  .to(ProfilesRepository)
  .inSingletonScope();
container.bind<ProfilesServiceI>(TYPES.ProfilesService).to(ProfilesService);
container
  .bind<ProfilesController>(TYPES.ProfilesController)
  .to(ProfilesController);

// USERS
container.bind<UsersServiceI>(TYPES.UsersService).to(UsersService);
container.bind<UsersController>(TYPES.UsersController).to(UsersController);

container
  .bind<UserWebAuthController>(TYPES.UserWebAuthController)
  .to(UserWebAuthController)
  .inSingletonScope();

export default container;
