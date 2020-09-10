const LIGHT_BASE: number = 70;
const DARK_BASE: number = 10;
const LIGHT_MOD: number = 16;
const DARK_MOD: number = 10;
const HUE_MOD: number = 361;
const SATURATION_MOD: number = 101;

function getCharCodeSum(str: string): number {
  let charCodeSum = 0;
  for (let i = 0; i < str.length; i++) {
    charCodeSum += str.charCodeAt(i);
  }
  return charCodeSum;
}
/*
getHslFromNum simply mods a number for possible hue, saturation, and lightness values

It can take optional parameters to restrict lightness values
*/
function getHslFromNum(
  num: number,
  lightnessBase: number = 0,
  lightnessMod: number = 101,
): string {
  const hue = num % HUE_MOD;
  const saturation = num % SATURATION_MOD;
  const lightness = lightnessBase + (num % lightnessMod);
  return `hsl(${hue},${saturation}%,${lightness}%)`;
}
export function stringToLightColor(str: string): string {
  const charCodeSum = getCharCodeSum(str);
  return getHslFromNum(charCodeSum, LIGHT_BASE, LIGHT_MOD);
}

export function stringToDarkColor(str: string): string {
  const charCodeSum = getCharCodeSum(str);
  return getHslFromNum(charCodeSum, DARK_BASE, DARK_MOD);
}
export function stringToAnyColor(str: string): string {
  const charCodeSum = getCharCodeSum(str);
  return getHslFromNum(charCodeSum);
}
