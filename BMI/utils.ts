interface BmiArguments {
  height: number;
  weight: number;
}

interface ExerciseArgs {
  dailyExercises: number[];
  target: number;
}

export const isNotNumber = (arg: string): boolean => {
  return isNaN(Number(arg));
};

export const parseBmiArgs = (args: string[]): BmiArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNotNumber(args[2]) && isNotNumber(args[3]))
    throw new Error('Provided values are not numbers');

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

export const parseExerciseArgs = (args: string[]): ExerciseArgs => {
  if (args.length < 3) throw new Error('Not enough arguments');

  if (!args.slice(2).every((arg) => !isNotNumber(arg)))
    throw new Error('Provided values are not numbers');

  return {
    dailyExercises: args.slice(3).map((arg) => Number(arg)),
    target: Number(args[2]),
  };
};
