import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { base } from "../assets/styles";
import Typography from "../components/Typography";
import { COLORS } from "../utils/constants";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { faAngleDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../store/store";
import { ActionScreenScreenProps } from "../navigation/types";
import { Sprite } from "../utils/types";
import Drawer from "../components/Drawer";

const initialLeftList = [
  { id: "1", label: "Move X by 10", action: { x: 10, y: 0 } },
  { id: "2", label: "Move Y by 10", action: { x: 0, y: 10 } },
  { id: "3", label: "Rotate 360", action: { rotate: 360 } },
  { id: "4", label: "Say Hello", action: { sayHello: "sayHello" } },
  { id: "5", label: "Repeat Once", action: { repeat: "repeat" } },
];

const ActionScreen = ({ route }: ActionScreenScreenProps) => {
  const { params } = route;
  const [sprite, setSprite] = useState<Sprite>(params.sprite);
  const [leftList] = useState(initialLeftList);
  const {
    showBall,
    showApple,
    showBanana,
    showDog,
    catAction,
    ballAction,
    appleAction,
    bananaAction,
    dogAction,
    setCatAction,
    setBallAction,
    setAppleAction,
    setBananaAction,
    setDogAction,
  } = useStore();

  const drawerOptions = [
    {
      label: `Cat`,
      onPress: () => {
        setSprite("CAT");
      },
    },
    showBall && {
      label: `Ball`,
      onPress: () => {
        setSprite("BALL");
      },
    },
    showApple && {
      label: `Apple`,
      onPress: () => {
        setSprite("APPLE");
      },
    },
    showBanana && {
      label: `Banana`,
      onPress: () => {
        setSprite("BANANA");
      },
    },
    showDog && {
      label: `dog`,
      onPress: () => {
        setSprite("DOG");
      },
    },
  ].filter(Boolean);

  const addItemToRightList = (item: any) => {
    const newItem = { ...item, key: `${item.id}-${Date.now()}` };
    switch (sprite) {
      case "CAT":
        setCatAction([...catAction, newItem]);
        break;
      case "BALL":
        setBallAction([...ballAction, newItem]);
        break;
      case "APPLE":
        setAppleAction([...appleAction, newItem]);
        break;
      case "BANANA":
        setBananaAction([...bananaAction, newItem]);
        break;
      case "DOG":
        setDogAction([...dogAction, newItem]);
        break;
    }
  };

  const deleteItemFromRightList = (key: any) => {
    switch (sprite) {
      case "CAT":
        setCatAction(catAction.filter((item: any) => item.key !== key));
        break;
      case "BALL":
        setBallAction(ballAction.filter((item: any) => item.key !== key));
        break;
      case "APPLE":
        setAppleAction(appleAction.filter((item: any) => item.key !== key));
        break;
      case "BANANA":
        setBananaAction(bananaAction.filter((item: any) => item.key !== key));
        break;
      case "DOG":
        setDogAction(dogAction.filter((item: any) => item.key !== key));
        break;
    }
  };

  const renderLeftItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => addItemToRightList(item)}
      style={pageStyles.item}
    >
      <Typography textColor="white">{item.label}</Typography>
    </TouchableOpacity>
  );

  const renderRightItem = ({ item, drag, isActive }: any) => (
    <TouchableOpacity onLongPress={drag}>
      <View style={[pageStyles.item, isActive && pageStyles.activeItem]}>
        <Typography textColor="white" style={{ maxWidth: "80%" }}>
          {item.label}
        </Typography>
        <TouchableOpacity onPress={() => deleteItemFromRightList(item.key)}>
          <FontAwesomeIcon icon={faTrash} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={pageStyles.container}>
      <View style={[pageStyles.actionlist, base.mr_0]}>
        <Typography style={pageStyles.head} align="center">
          Select Code
        </Typography>
        <View style={pageStyles.underline}></View>
        <FlatList
          data={leftList}
          keyExtractor={(item) => item.id}
          renderItem={renderLeftItem}
        />
      </View>
      <View style={pageStyles.actionlist}>
        <Typography style={pageStyles.head} align="center">
          Actions
        </Typography>
        <View style={pageStyles.underline}></View>
        <View style={base.row}>
          <Drawer options={drawerOptions} callback={() => {}}>
            <View
              style={[
                pageStyles.head,
                base.mr_xs,
                pageStyles.headActive,
                base.row,
                base.justify_around,
              ]}
            >
              <Typography align="center" textColor={"primary"}>
                {sprite}
              </Typography>
              <FontAwesomeIcon icon={faAngleDown} color={COLORS.primary} />
            </View>
          </Drawer>
        </View>
        <View style={pageStyles.underline}></View>
        <FlatList
          data={
            sprite === "CAT"
              ? catAction
              : sprite === "BALL"
              ? ballAction
              : sprite === "APPLE"
              ? appleAction
              : sprite === "BANANA"
              ? bananaAction
              : dogAction
          }
          keyExtractor={(item, index) => `${item.id}${index}`}
          renderItem={renderRightItem}
          ListEmptyComponent={
            <Typography align="center" textColor="gray" style={[base.mt_l, base.f_14]}>
              No actions have been set for sprite: {sprite}
            </Typography>
          }
        />
      </View>
    </View>
  );
};

const pageStyles = StyleSheet.create({
  container: {
    ...base.container,
    ...base.bg_light,
    ...base.row,
    ...base.justify_around,
  },
  actionlist: {
    ...base.bg_white,
    ...base.br_5,
    ...base.p_xxs,
    ...base.m_xxs,
    ...base.container,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  underline: {
    ...base.mb_s,
    backgroundColor: COLORS.border,
    width: "100%",
    height: 1,
  },
  head: {
    ...base.br_5,
    ...base.mb_xs,
    width: "100%",
  },
  headActive: {
    ...base.p_s,
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  item: {
    ...base.p_s,
    ...base.bg_secondary,
    ...base.br_5,
    ...base.mb_xs,
    ...base.row,
    ...base.align_center,
    ...base.justify_between,
  },
  activeItem: {
    ...base.bg_primary,
  },
});

export default ActionScreen;
