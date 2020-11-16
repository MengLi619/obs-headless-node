import * as config from '../resource/config.json';
import { Scene } from './types';
import { Settings } from 'obs-node';

export const scenes = config.scenes as Scene[];
export const obsSettings = config.settings as Settings;
export const dsk = config.dsk;
