export const remap = (
  sourceFrom: number,
  sourceTo: number,
  targetFrom: number,
  targetTo: number,
  value: number,
) => targetFrom + (value - sourceFrom) * (targetTo - targetFrom) / (sourceTo - sourceFrom);

export const inRange = (value: number, min: number, max: number) => min <= value && value <= max;
