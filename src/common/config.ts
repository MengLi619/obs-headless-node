import { Settings } from 'obs-node';
import * as c from '../resource/config.json';
import { routes } from '../route';
import { PORT } from './constant';

export const config = c;

export const httpServerOptions = {
  routes: routes,
  port: Number(PORT),
};

export const obsSettings = config.settings as Settings;
