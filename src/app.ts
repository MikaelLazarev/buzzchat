import 'reflect-metadata';
import {ConfigParams} from './config/config';
import express, {Application} from 'express';
import cors from 'cors';
import * as path from 'path';
import {morganLogger} from './middleware/logger';
import bodyParser from 'body-parser';
import container from './config.inversify';
import {TYPES} from './types';
import errorHandler from './middleware/errorHandler';
import {ProfilesController} from './controllers/profilesController';
import {ChatsController} from './controllers/chatsController';
import {BluzelleHelper} from './repository/bluzelleHelper';
import {DbController} from './controllers/dbController';
import {UsersController} from './controllers/usersController';
import {SocketRouter} from './controllers/socketRouter';
import * as Sentry from '@sentry/node';
import {UserWebAuthController} from './controllers/userWebAuthController';
import {loginRequireMiddleware} from './middleware/loginRequired';

export function createApp(config: ConfigParams): Promise<Application> {
  return new Promise<Application>(async (resolve) => {
    const app = express();

    if (process.env.NODE_ENV !== 'development') {
      Sentry.init({
        dsn: config.sentryDSN,
        integrations: [
          new Sentry.Integrations.OnUncaughtException(),
          new Sentry.Integrations.OnUnhandledRejection(),
        ],
      });
      // The request handler must be the first middleware on the app
      app.use(Sentry.Handlers.requestHandler());
      // The error handler must be before any other error middleware
      app.use(Sentry.Handlers.errorHandler());
    }

    app.use(
      cors({
        credentials: true,
        origin: '*',
      }),
    );

    app.use(morganLogger);

    app.use(bodyParser.json());

    BluzelleHelper.globalConfig = {
      mnemonic: config.bluzelle_mnemonic,
      uuid: '',
      endpoint: config.bluzelle_endpoint,
      chain_id: config.bluzelle_chain_id,
    };

    const usersController = container.get<UsersController>(
      TYPES.UsersController,
    );

    const dbController = new DbController();

    const loginRequired = loginRequireMiddleware(config.jwt_secret);
    // Users Controller
    app.post('/auth/phone/get_code/', usersController.sendCode());
    app.post('/auth/phone/login/', usersController.login());
    app.post('/auth/token/refresh/', usersController.refresh());
    app.post('/auth/web_auth/', loginRequired, usersController.authorize_web());

    // // Profiles Controller
    // app.get('/api/profile/', loginRequired, profilesController.retrieve());
    // app.post('/api/profile/', loginRequired, profilesController.update());
    // app.post('/api/profile/new_contact/', loginRequired, profilesController.new_contact());
    // app.post('/api/profile/new_chat/', loginRequired, profilesController.new_contact());
    // app.get('/api/contacts/', loginRequired, profilesController.list());

    // DB Controller
    app.get('/api/stat/', dbController.retrieve());

    app.use(express.static(path.join(__dirname, '../client/build/')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });

    // ERROR HANDLER
    app.use(errorHandler);

    let server = require('http').Server(app);
    // set up socket.io and bind it to our
    // http server.
    let io = require('socket.io').listen(server, {
      origins: '*:*',
      pingTimeout: 50000,
      pingInterval: 50000,
    });
    try {
      const profilesController = container.get<ProfilesController>(
        TYPES.ProfilesController,
      );
      const chatsController = container.get<ChatsController>(
        TYPES.ChatsController,
      );

      const socketRouter = new SocketRouter([
        profilesController,
        chatsController,
      ]);

      const webAuthController = container.get<UserWebAuthController>(
        TYPES.UserWebAuthController,
      );
      socketRouter.connect(io);
      webAuthController.connect(io);
    } catch (e) {
      console.log('Cant start socket controllers', e);
    }

    resolve(server);
  });
}
