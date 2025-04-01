import { Response, Router } from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnosis } from '../types';

const router = Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
