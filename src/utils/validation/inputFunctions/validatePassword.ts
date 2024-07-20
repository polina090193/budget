import { isValidPassword } from "../validationExp/isValidPassword";

export const validatePassword = (password: string | undefined): string | null => {

  if (!password) {
    return 'Password is required';
  }

  if (!isValidPassword(password)) {
    return `The password should contain at least one lowercase letter, one uppercase letter, one digit, and a minimum length of 8 characters`;
  }

  return null;
};
