const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

export function getEnumKeys(enumVar: any): string[] {
  return Object.keys(enumVar)
    .filter(StringIsNumber)
    .map(key => enumVar[key]);
}
