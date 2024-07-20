import { isPressedKeyNumeric } from "../validationExp/isPressedKeyNumeric";

export const preventNotNum = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!isPressedKeyNumeric(event.key)) {
    event.preventDefault();
  }
}
