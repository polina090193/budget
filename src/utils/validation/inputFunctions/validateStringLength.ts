import { isAtLeastNSymbols } from "../validationExp/isAtLeastNSymbols";

export const validateStringLength = (str: string | null, minLength: number): string | undefined => {
  let error
  if (!str) {
    error = 'Field is required';
  } else if (!isAtLeastNSymbols(str, minLength)) {
    error = `The field should contain at least ${minLength} letters`;
  }

  return error;
};
