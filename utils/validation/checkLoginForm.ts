import { isValidEmail } from "./isValidEmail";
import { isValidPassword } from "./isValidPassword";


export const checkLoginFormForErrors = (
  email: string | undefined,
  password: string | undefined,
  ): string | null => {

  if (!email) {
    return 'Email is required';
  }

  if (!password) {
    return 'Password is required';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }

  if (!isValidPassword(password)) {
    return `The password should contain at least one lowercase letter, one uppercase letter, one digit, and a minimum length of 8 characters`;
  }

  return null;
};
