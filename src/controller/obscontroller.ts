import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as obs from 'obs-node';
import { TransitionType } from 'obs-node';
import { scenes } from '../common/config';

export const obsController = new class ObsController {

  public getScenes(req: Request, res: Response) {
    res.json(scenes);
  }

  public switch(req: Request, res: Response) {
    req.checkParams('sceneId', 'code is not valid').isString().notEmpty();
    req.checkBody('transitionType', 'transitionType is not valid').isString().optional();
    req.checkBody('transitionMs', 'transitionMs is not valid').isNumeric().optional();
    const errors = req.validationErrors();
    if (errors) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: errors });
      return;
    }

    const sceneId = req.params.sceneId;
    const transitionType: TransitionType = req.body.transitionType || 'cut_transition';
    const transitionMs: number = Number(req.body.transitionMs || '0');

    try {
      obs.switchToScene(sceneId, transitionType, transitionMs);
      res.status(StatusCodes.OK).end();
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  public restart(req: Request, res: Response) {
    req.checkBody('sceneId', 'sceneId is not valid').isString().notEmpty();
    req.checkBody('sourceId', 'sourceId is not valid').isString().notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: errors });
      return;
    }

    const sceneId = req.body.sceneId;
    const sourceId = req.body.sourceId;
    try {
      obs.restartSource(sceneId, sourceId);
      res.status(StatusCodes.OK).end();
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }
};
