export const isPressedKeyNumeric = (key: string) => {
  return /^[0-9]$|^Arrow.*$|^Backspace$|^Delete$|^Tab$|^Enter$/.test(key);
}
