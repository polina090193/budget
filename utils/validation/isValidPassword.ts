import { validation_values } from "@/db/validation";

export const isValidPassword = (password: string) => validation_values.password_regex.test(password);
