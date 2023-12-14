import { validation_values } from "@/db/validation";

export const isValidEmail = (email: string) => validation_values.email_regex.test(email);
