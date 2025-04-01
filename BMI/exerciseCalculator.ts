import { parseExerciseArgs } from './utils';

interface Result {
  periodLength: number;
  trainigDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExercises: number[],
  target: number
): Result => {
  const average: number =
    dailyExercises.reduce((acc, cur) => acc + cur) / dailyExercises.length;
  const avgPercent: number = (average / target) * 100;

  let rating: number;
  let ratingDescription: string;

  if (avgPercent < 50) {
    rating = 1;
    ratingDescription = 'target not reached';
  } else if (avgPercent >= 50 && avgPercent < 100) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'taget reached';
  }

  return {
    periodLength: dailyExercises.length,
    trainigDays: dailyExercises.reduce(
      (acc, cur) => (cur !== 0 ? ++acc : acc),
      0
    ),
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { dailyExercises, target } = parseExerciseArgs(process.argv);
    console.log(calculateExercises(dailyExercises, target));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    console.log(errorMessage);
  }
}
