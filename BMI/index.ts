import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (
    !req.query.height &&
    !req.query.weight &&
    isNaN(Number(req.query.height)) &&
    isNaN(Number(req.query.weight))
  ) {
    res.status(400).send({ error: 'malformatted parametes' });
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);

    res.send({
      weight,
      height,
      bmi,
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    !daily_exercises.every((exercise) => !isNaN(exercise)) ||
    isNaN(Number(target))
  ) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  res.send(calculateExercises(daily_exercises as number[], Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
