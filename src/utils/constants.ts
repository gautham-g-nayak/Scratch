import { Dimensions } from "react-native";

import { Colors, Sizing, DimensionHelper } from "./types";

const { width, height } = Dimensions.get("window");

const COLORS: Colors = {
  primary: "#2A71D4",
  secondary: "#0096FF",
  bgLight: "#eff3ff",
  black: "#000000",
  white: "#ffffff",
  border: "#cbd5e1",
  text: "#0F1734",
  gray: "gray",
  dark_overlay: "rgba(0, 0, 0, 0.3)",
};

const SIZES: Sizing = {
  base: 8,
  font: 14,
  unit: 1,
  s: 6,
  xs: 4,
  xxs: 2,
  m: 10,
  l: 12,
  xl: 16,
  xxl: 40,
};

const DIMENSIONS: DimensionHelper = {
  width,
  height,
  wp: (percentage: number) => (percentage * width) / 100,
  hp: (percentage: number) => (percentage * height) / 100,
};

export { COLORS, SIZES, DIMENSIONS };
