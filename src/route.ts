import { obsController } from './controller/obscontroller';
import { Route } from './common/http';

const version = '/v1';

export const routes: Route[] = [
  {
    method: 'get',
    route: `${version}/scenes`,
    action: obsController.getScenes.bind(obsController),
  },
  {
    method: 'post',
    route: `${version}/switch/:sceneId`,
    action: obsController.switch.bind(obsController),
  },
  {
    method: 'post',
    route: `${version}/restart`,
    action: obsController.restart.bind(obsController),
  },
];
