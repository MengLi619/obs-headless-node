import { createHttpServer } from './common/http';
import { routes } from './route';
import { PORT } from './common/constant';
import * as obs from 'obs-node';
import { SourceType } from 'obs-node';
import { dsk, obsSettings, scenes } from './common/config';

const httpOptions = {
  routes: routes,
  port: Number(PORT)
};

obs.startup(obsSettings);
scenes.forEach(scene => {
  obs.addScene(scene.id);
  scene.sources.forEach(source => {
    obs.addSource(scene.id, source.id, source.type as SourceType, source.url);
  });
});
dsk.forEach(d => {
  obs.addDSK(d.id, d.position as obs.Position, d.url, d.left, d.top, d.width, d.height);
});

createHttpServer(httpOptions)
  .catch(error => console.log(`Failed to create http server: ${error}`));
