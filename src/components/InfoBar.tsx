import { View, StyleSheet } from "react-native";
import { base } from "../assets/styles";
import Typography from "./Typography";
import { COLORS } from "../utils/constants";
import { Sprite } from "../utils/types";

type Props = {
  sprite: Sprite;
  coordinates: { x: number; y: number };
};

function InfoBar({ sprite, coordinates }: Props): JSX.Element {
  return (
    <View style={pageStyles.container}>
      <View style={pageStyles.textContainer}>
        <Typography>Sprite</Typography>
        <Typography style={pageStyles.textWithBorder}>{sprite}</Typography>
      </View>
      <View style={pageStyles.textContainer}>
        <Typography>X</Typography>
        <Typography style={pageStyles.textWithBorder}>
          {coordinates.x.toFixed(2)}
        </Typography>
      </View>
      <View style={pageStyles.textContainer}>
        <Typography>Y</Typography>
        <Typography style={pageStyles.textWithBorder}>
          {coordinates.y.toFixed(2)}
        </Typography>
      </View>
    </View>
  );
}

const pageStyles = StyleSheet.create({
  container: {
    ...base.bg_white,
    ...base.m_xxs,
    ...base.br_5,
    ...base.align_center,
    ...base.justify_around,
    ...base.row,
    ...base.py_xs,
    ...base.mt_0,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textContainer: {
    ...base.row,
    ...base.align_center,
    ...base.ml_xs,
  },
  textWithBorder: {
    ...base.br_5,
    ...base.ml_s,
    ...base.p_xxs,
    ...base.bg_light,
  },
});

export default InfoBar;
