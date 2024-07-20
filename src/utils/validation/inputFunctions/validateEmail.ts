import { isValidEmail } from "../validationExp/isValidEmail";

export const validateEmail = (email: string | undefined): string | null => {

  if (!email) {
    return 'Email is required';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};
