export const checkIfError = (error: unknown): error is Error => {
  return error instanceof Error;
};
