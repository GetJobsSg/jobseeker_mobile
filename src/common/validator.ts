export const isAlphaCharacters = (value: string | undefined) => {
  if (!value) return false;
  return /^[a-zA-Z\s]+$/.test(value);
};
