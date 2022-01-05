import { remap } from "./numberUtils";

export const greenRed = (t: number) => {
  const colors = [
    "#28e727",
    "#6ed600",
    "#91c500",
    "#abb200",
    "#be9e00",
    "#cd8a00",
    "#d77300",
    "#de5b00",
    "#e04103",
    "#dd2024",
  ];

  return colors[Math.floor(remap(0, 1, 0, 9, t))];
};
