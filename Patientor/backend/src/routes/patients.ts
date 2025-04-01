import { Response, Router } from 'express';
import patientService from '../services/patientService';
import { NoSsnPatient } from '../types';
import toNewPatientEntry from '../utils';

const router = Router();

router.get('/', (_req, res: Response<NoSsnPatient[]>) => {
  res.send(patientService.getNoSsnPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
