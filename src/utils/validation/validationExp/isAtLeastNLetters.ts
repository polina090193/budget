export const isAtLeastNLetters = (key: string, minLength: number) =>
  new RegExp(`^[a-zA-Z]{${minLength},}$`).test(key);
