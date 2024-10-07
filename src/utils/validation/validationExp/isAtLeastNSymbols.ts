export const isAtLeastNSymbols = (key: string, minLength: number) =>
  new RegExp(`^.{${minLength},}$`).test(key);
