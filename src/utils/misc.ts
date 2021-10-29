// capitalise first character
export function capitalise(value: string) {
  const firstChar = value.charAt(0);
  const restString = value.slice(1);
  return firstChar.toUpperCase() + restString.toLowerCase();
}
