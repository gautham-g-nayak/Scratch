import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { base } from "../assets/styles";
import Typography from "./Typography";
import { icons } from "../utils/icons";
import { COLORS, DIMENSIONS, SIZES } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { UseNavigationProps } from "../navigation/types";
import { useStore } from "../store/store";
import { Sprite } from "../utils/types";
import Drawer from "./Drawer";

function SpriteBar(): JSX.Element {
  const navigate = useNavigation<UseNavigationProps>().navigate;
  const {
    catAction,
    ballAction,
    appleAction,
    bananaAction,
    dogAction,
    showBall,
    showApple,
    showBanana,
    showDog,
    setShowDog,
    setShowBanana,
    setShowApple,
    setShowBall,
  } = useStore();

  const gotoActions = (sprite: Sprite) => navigate("ActionScreen", { sprite });

  const drawerOptions = [
    {
      label: `Ball`,
      onPress: () => {
        setShowBall(true);
      },
    },
    {
      label: `Apple`,
      onPress: () => {
        setShowApple(true);
      },
    },
    {
      label: `Banana`,
      onPress: () => {
        setShowBanana(true);
      },
    },
    {
      label: `dog`,
      onPress: () => {
        setShowDog(true);
      },
    },
  ];

  return (
    <View style={pageStyles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={base.align_center}
      >
        <TouchableOpacity
          style={pageStyles.spriteCard}
          onPress={() => gotoActions("CAT")}
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
            <Typography
              style={pageStyles.text}
              textColor="white"
              align="center"
            >
              Add actions
            </Typography>
          </View>
        </TouchableOpacity>

        {showBall && (
          <TouchableOpacity
            style={pageStyles.spriteCard}
            onPress={() => gotoActions("BALL")}
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

        {showApple && (
          <TouchableOpacity
            style={pageStyles.spriteCard}
            onPress={() => gotoActions("APPLE")}
          >
            <View style={base.align_center}>
              <View style={[base.align_center, base.row]}>
                <Image source={icons.apple} style={pageStyles.spriteImg} />
                {appleAction.length > 0 && (
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

        {showBanana && (
          <TouchableOpacity
            style={pageStyles.spriteCard}
            onPress={() => gotoActions("BANANA")}
          >
            <View style={base.align_center}>
              <View style={[base.align_center, base.row]}>
                <Image source={icons.banana} style={pageStyles.spriteImg} />
                {bananaAction.length > 0 && (
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

        {showDog && (
          <TouchableOpacity
            style={pageStyles.spriteCard}
            onPress={() => gotoActions("DOG")}
          >
            <View style={base.align_center}>
              <View style={[base.align_center, base.row]}>
                <Image source={icons.dog} style={pageStyles.spriteImg} />
                {dogAction.length > 0 && (
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

        {!(showBall && showApple && showDog && showBanana) && (
          <Drawer options={drawerOptions} callback={() => {}}>
            <View style={pageStyles.addIcon}>
              <FontAwesomeIcon icon={faAdd} color={COLORS.primary} />
            </View>
          </Drawer>
        )}
      </ScrollView>
    </View>
  );
}

const pageStyles = StyleSheet.create({
  container: {
    ...base.bg_white,
    ...base.m_xxs,
    ...base.br_5,
    ...base.row,
    ...base.py_xxs,
    ...base.mt_0,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  spriteCard: {
    ...base.align_center,
    ...base.br_8,
    borderStyle: "solid",
    borderColor: COLORS.primary,
    borderWidth: 2,
    marginLeft: 8,
  },
  spriteImg: {
    height: DIMENSIONS.wp(15),
    width: DIMENSIONS.wp(15),
    ...base.mt_s,
  },
  actionsSet: {
    // ...base.p_xxs,
    backgroundColor: "green",
    position: "absolute",
    opacity: 0.7,
    fontSize: SIZES.m,
    width: "100%",
    marginLeft: -10,
  },
  text: {
    ...base.mt_s,
    ...base.bg_primary,
    ...base.f_12,
    padding: 5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  addIcon: {
    ...base.br_8,
    borderStyle: "solid",
    borderColor: COLORS.primary,
    borderWidth: 2,
    padding: 15,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default SpriteBar;
