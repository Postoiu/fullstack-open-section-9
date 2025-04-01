import patientData from '../../data/patients';
import { NewPatient, NoSsnPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNoSsnPatients = (): NoSsnPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default { getPatients, getNoSsnPatients, addPatient };
