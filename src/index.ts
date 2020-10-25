import { createHttpServer } from './common/http';
import { routes } from './route';
import { PORT } from './common/constant';
import * as obs from 'obs-node';
import { config, obsSettings } from './common/config';
import { SourceType } from 'obs-node';

const httpOptions = {
  routes: routes,
  port: Number(PORT)
};

obs.startup(obsSettings);
config.scenes.forEach(scene => {
  obs.addScene(scene.id);
  scene.sources.forEach(source => {
    obs.addSource(scene.id, source.id, source.type as SourceType, source.url);
  });
});


createHttpServer(httpOptions)
  .catch(error => console.log(`Failed to create http server: ${error}`));
