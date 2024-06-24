import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { base } from "../assets/styles";
import Typography from "./Typography";
import { icons } from "../utils/icons";
import { COLORS, DIMENSIONS, SIZES } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { UseNavigationProps } from "../navigation/types";
import { useStore } from "../store/store";

type Props = {
  showBall: Boolean;
  handleShowBall: () => void;
};

function SpriteBar({ showBall, handleShowBall }: Props): JSX.Element {
  const navigate = useNavigation<UseNavigationProps>().navigate;
  const { catAction, ballAction } = useStore();

  const gotoActions = (isCat = true) =>
    navigate("ActionScreen", { isCat: isCat });

  return (
    <View style={pageStyles.container}>
      <TouchableOpacity
        style={pageStyles.spriteCard}
        onPress={() => gotoActions()}
      >
        <View style={base.align_center}>
          <View style={[base.align_center, base.row]}>
            <Image source={icons.cat} style={pageStyles.spriteImg} />
            {catAction.length > 0 && (
              <Typography
                style={pageStyles.actionsSet}
                textColor="white"
                align="center"
              >
                Actions set
              </Typography>
            )}
          </View>
          <Typography style={pageStyles.text} textColor="white" align="center">
            Add actions
          </Typography>
        </View>
      </TouchableOpacity>
      {showBall && (
        <TouchableOpacity
          style={pageStyles.spriteCard}
          onPress={() => gotoActions(false)}
        >
          <View style={base.align_center}>
            <View style={[base.align_center, base.row]}>
              <Image source={icons.ball} style={pageStyles.spriteImg} />
              {ballAction.length > 0 && (
                <Typography
                  style={pageStyles.actionsSet}
                  textColor="white"
                  align="center"
                >
                  Actions set
                </Typography>
              )}
            </View>
            <Typography
              style={pageStyles.text}
              textColor="white"
              align="center"
            >
              Add actions
            </Typography>
          </View>
        </TouchableOpacity>
      )}
      {!showBall && (
        <TouchableOpacity
          style={[pageStyles.spriteCard, base.p_s, base.pt_s]}
          onPress={handleShowBall}
        >
          <FontAwesomeIcon
            icon={faAdd}
            color={COLORS.primary}
            style={base.pt_s}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const pageStyles = StyleSheet.create({
  container: {
    ...base.bg_white,
    ...base.m_xxs,
    ...base.br_5,
    ...base.align_center,
    ...base.row,
    ...base.py_xs,
    ...base.mt_0,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  spriteCard: {
    ...base.align_center,
    ...base.ml_xs,
    ...base.br_8,
    ...base.pt_xxs,
    borderStyle: "solid",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  spriteImg: {
    height: DIMENSIONS.wp(15),
    width: DIMENSIONS.wp(15),
  },
  actionsSet: {
    ...base.p_xxs,
    backgroundColor: "green",
    position: "absolute",
    opacity: 0.7,
    fontSize: SIZES.m,
    width: "100%",
    marginLeft: "-15.5%",
  },
  text: {
    ...base.mt_s,
    ...base.p_xxs,
    ...base.bg_primary,
    ...base.f_12,
  },
});

export default SpriteBar;
