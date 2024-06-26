import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../utils/constants";

const baseStyles = StyleSheet.create({
  // Layouts
  container: {
    flex: 1,
  },

  ar_1: {
    aspectRatio: 1,
  },

  // bg colors
  bg_primary: {
    backgroundColor: COLORS.primary,
  },
  bg_secondary: {
    backgroundColor: COLORS.secondary,
  },
  bg_white: {
    backgroundColor: COLORS.white,
  },
  bg_light: {
    backgroundColor: COLORS.bgLight,
  },
  bg_modal: {
    backgroundColor: COLORS.dark_overlay,
  },

  // flexbox
  row: {
    flexDirection: "row",
  },
  justify_center: {
    justifyContent: "center",
  },
  justify_start: {
    justifyContent: "flex-start",
  },
  justify_end: {
    justifyContent: "flex-end",
  },
  justify_between: {
    justifyContent: "space-between",
  },
  justify_around: {
    justifyContent: "space-around",
  },
  align_center: {
    alignItems: "center",
  },
  align_start: {
    alignItems: "flex-start",
  },
  self_start: {
    alignSelf: "flex-start",
  },
  self_center: {
    alignSelf: "center",
  },
  self_end: {
    alignSelf: "flex-end",
  },
  wrap: {
    flexWrap: "wrap",
  },
  items_start: {
    alignItems: "flex-start",
  },
  text_center: {
    textAlign: "center",
  },

  // width
  w_auto: {
    width: "auto",
  },
  w_100: {
    width: "100%",
  },
  w_90: {
    width: "90%",
  },
  w_80: {
    width: "80%",
  },
  w_75: {
    width: "75%",
  },
  w_70: {
    width: "70%",
  },
  w_65: {
    width: "65%",
  },
  w_60: {
    width: "60%",
  },
  w_50: {
    width: "50%",
  },
  w_48: {
    width: "48%",
  },
  w_40: {
    width: "40%",
  },
  w_30: {
    width: "30%",
  },
  w_20: {
    width: "20%",
  },
  w_10: {
    width: "10%",
  },

  // overall padding
  p_0: {
    padding: 0,
  },
  p_xxxs: {
    padding: "1.25%",
  },
  p_xxs: {
    padding: "2.5%",
  },
  p_xs: {
    padding: "3.5%",
  },
  p_s: {
    padding: "5%",
  },
  p_m: {
    padding: "7.5%",
  },
  p_l: {
    padding: "10%",
  },

  // horizontal padding
  px_xxs: {
    paddingHorizontal: "2.5%",
  },
  px_xs: {
    paddingHorizontal: "3.5%",
  },
  px_s: {
    paddingHorizontal: "5%",
  },
  px_m: {
    paddingHorizontal: "7.5%",
  },
  px_l: {
    paddingHorizontal: "10%",
  },

  // vertical padding
  py_xxs: {
    paddingVertical: "2.5%",
  },
  py_xs: {
    paddingVertical: "3.5%",
  },
  py_s: {
    paddingVertical: "5%",
  },
  py_m: {
    paddingVertical: "7.5%",
  },
  py_l: {
    paddingVertical: "10%",
  },

  // top padding
  pt_0: {
    paddingTop: 0,
  },
  pt_xxs: {
    paddingTop: "2.5%",
  },
  pt_xs: {
    paddingTop: "3.5%",
  },
  pt_s: {
    paddingTop: "5%",
  },
  pt_m: {
    paddingTop: "7.5%",
  },
  pt_l: {
    paddingTop: "10%",
  },

  // bottom padding
  pb_0: {
    paddingBottom: 0,
  },
  pb_15: {
    paddingBottom: 15,
  },
  pb_xxs: {
    paddingBottom: "2.5%",
  },
  pb_xs: {
    paddingBottom: "3.5%",
  },
  pb_s: {
    paddingBottom: "5%",
  },
  pb_m: {
    paddingBottom: "7.5%",
  },
  pb_l: {
    paddingBottom: "10%",
  },

  // left padding
  pl_xxs: {
    paddingLeft: "2.5%",
  },
  pl_xs: {
    paddingLeft: "3.5%",
  },
  pl_s: {
    paddingLeft: "5%",
  },
  pl_m: {
    paddingLeft: "7.5%",
  },
  pl_l: {
    paddingLeft: "10%",
  },

  // right padding
  pr_0: {
    paddingRight: 0,
  },
  pr_xxs: {
    paddingRight: "2.5%",
  },
  pr_xs: {
    paddingRight: "3.5%",
  },
  pr_s: {
    paddingRight: "5%",
  },
  pr_m: {
    paddingRight: "7.5%",
  },
  pr_l: {
    paddingRight: "10%",
  },

  // overall margin
  m_0: {
    margin: 0,
  },
  m_xxs: {
    margin: "2.5%",
  },
  m_xs: {
    margin: "3.5%",
  },
  m_s: {
    margin: "5%",
  },
  m_m: {
    margin: "7.5%",
  },
  m_l: {
    margin: "10%",
  },

  // horizontal padding
  mx_xxs: {
    marginHorizontal: "2.5%",
  },
  mx_xs: {
    marginHorizontal: "3.5%",
  },
  mx_s: {
    marginHorizontal: "5%",
  },
  mx_m: {
    marginHorizontal: "7.5%",
  },
  mx_l: {
    marginHorizontal: "10%",
  },

  // vertical padding
  my_xxs: {
    marginVertical: "2.5%",
  },
  my_xs: {
    marginVertical: "3.5%",
  },
  my_s: {
    marginVertical: "5%",
  },
  my_m: {
    marginVertical: "7.5%",
  },
  my_l: {
    marginVertical: "10%",
  },

  // top padding
  mt_0: {
    marginTop: 0,
  },
  mt_xxs: {
    marginTop: "2.5%",
  },
  mt_xs: {
    marginTop: "3.5%",
  },
  mt_s: {
    marginTop: "5%",
  },
  mt_m: {
    marginTop: "7.5%",
  },
  mt_l: {
    marginTop: "10%",
  },

  // bottom padding
  mb_0: {
    marginBottom: 0,
  },
  mb_xxs: {
    marginBottom: "2.5%",
  },
  mb_xs: {
    marginBottom: "3.5%",
  },
  mb_s: {
    marginBottom: "5%",
  },
  mb_m: {
    marginBottom: "7.5%",
  },
  mb_l: {
    marginBottom: "10%",
  },

  mb_xl: {
    marginBottom: "15%",
  },

  // left padding
  ml_0: {
    marginTop: 0,
  },
  ml_xxxs: {
    marginLeft: "1.5%",
  },
  ml_xxs: {
    marginLeft: "2.5%",
  },
  ml_xs: {
    marginLeft: "3.5%",
  },
  ml_s: {
    marginLeft: "5%",
  },
  ml_m: {
    marginLeft: "7.5%",
  },
  ml_l: {
    marginLeft: "10%",
  },
  ml_xl: {
    marginLeft: "12.5%",
  },

  // right padding
  mr_0: {
    marginRight: 0,
  },
  mr_xxxs: {
    marginRight: "1.0%",
  },
  mr_xxs: {
    marginRight: "2.5%",
  },
  mr_xs: {
    marginRight: "3.5%",
  },
  mr_s: {
    marginRight: "5%",
  },
  mr_m: {
    marginRight: "7.5%",
  },
  mr_l: {
    marginRight: "10%",
  },

  // font sizes
  f_10: {
    fontSize: SIZES.m,
  },
  f_12: {
    fontSize: SIZES.l,
  },
  f_14: {
    fontSize: SIZES.xl - SIZES.xxs,
  },
  f_16: {
    fontSize: SIZES.xl,
  },
  f_18: {
    fontSize: SIZES.l * 1.5,
  },
  f_20: {
    fontSize: SIZES.m * 2,
  },

  // font weights
  fw_300: {
    fontWeight: "300",
  },
  fw_700: {
    fontWeight: "700",
  },

  // line heights
  lh_16: {
    lineHeight: SIZES.xl,
  },
  lh_24: {
    lineHeight: SIZES.xl * 1.5,
  },
  lh_36: {
    lineHeight: SIZES.l * 3,
  },
  lh_40: {
    lineHeight: SIZES.xxl,
  },

  // border radius
  br_0: {
    borderRadius: 0,
  },
  br_5: {
    borderRadius: 5,
  },
  br_6: {
    borderRadius: 6,
  },
  br_8: {
    borderRadius: 8,
  },
  br_base: {
    borderRadius: SIZES.base,
  },
  br_rightwidth: {
    borderRightWidth: 1,
  },

  // position
  ps_relative: {
    position: "relative",
  },
  ps_absolute: {
    position: "absolute",
  },

  // Z-indexs
  z_20: {
    zIndex: 20,
  },

  // text transforms
  uppercase: {
    textTransform: "uppercase",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  lowercase: {
    textTransform: "lowercase",
  },
});

const styles = StyleSheet.create({
  white_container: {
    ...baseStyles.container,
    ...baseStyles.bg_white,
  },
});

export { styles, baseStyles as base };
