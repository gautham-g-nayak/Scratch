export type StatusBarProps = {
  barStyle: "light-content" | "dark-content" | "default";
  backgroundColor: string;
};

export type Sprite = "CAT" | "BALL" | "APPLE" | "BANANA" | "DOG";

export type DimensionHelper = {
  width: number;
  height: number;
  wp: (percentage: number) => number;
  hp: (percentage: number) => number;
};

export type Colors = {
  primary: "#2A71D4";
  secondary: "#0096FF";
  black: "#000000";
  white: "#ffffff";
  border: "#cbd5e1";
  bgLight: "#eff3ff";
  text: "#0F1734";
  gray: "gray";
  dark_overlay: "rgba(0, 0, 0, 0.3)";
};

export type Sizing = {
  base: 8;
  font: 14;
  unit: 1;
  s: 6;
  xs: 4;
  xxs: 2;
  m: 10;
  l: 12;
  xl: 16;
  xxl: 40;
};

export type Color = keyof Colors;

export type Size = keyof Sizing;
