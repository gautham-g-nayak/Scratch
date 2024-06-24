import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

import { COLORS, DIMENSIONS, SIZES } from "../utils/constants";
import { Color } from "../utils/types";

type Props = {
  children: React.ReactNode;
  textColor?: Color;
  size?: number;
  style?: StyleProp<TextStyle>;
  lines?: number;
  align?: "left" | "center" | "right";
  mb?: number;
};

function Typography({
  children,
  textColor = "text",
  size = SIZES.xl,
  style,
  lines,
  align = "left",
  mb = 0,
}: Props): JSX.Element {
  const fontStyle = getStyles(textColor, size, align, mb);

  return (
    <Text style={[fontStyle, style]} numberOfLines={lines}>
      {children}
    </Text>
  );
}

function getStyles(
  color: Color,
  size: number,
  align: "left" | "center" | "right",
  mb: number
): TextStyle {
  return StyleSheet.create({
    textStyle: {
      color: COLORS[color],
      fontSize: size,
      textAlign: align,
      marginBottom: DIMENSIONS.hp(mb),
    },
  }).textStyle;
}

export default Typography;
