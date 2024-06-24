import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { base } from "../assets/styles";
import Typography from "../components/Typography";
import { COLORS } from "../utils/constants";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { faBars, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../store/store";
import { ActionScreenScreenProps } from "../navigation/types";

const initialLeftList = [
  { id: "1", label: "Move X by 10", action: { x: 10, y: 0 } },
  { id: "2", label: "Move Y by 10", action: { x: 0, y: 10 } },
  { id: "3", label: "Rotate 360", action: { rotate: 360 } },
  { id: "4", label: "Say Hello", action: { sayHello: "sayHello" } },
  { id: "5", label: "Repeat Once", action: { repeat: "repeat" } },
];

const ActionScreen = ({ route }: ActionScreenScreenProps) => {
  const { params } = route;
  const [leftList] = useState(initialLeftList);
  const [isCat, setIsCat] = useState(params.isCat);
  const { showBall, catAction, ballAction, setBallAction, setCatAction } =
    useStore();

  const addItemToRightList = (item: any) => {
    if (isCat) {
      setCatAction([
        ...catAction,
        { ...item, key: `${item.id}-${Date.now()}` },
      ]);
    } else {
      setBallAction([
        ...ballAction,
        { ...item, key: `${item.id}-${Date.now()}` },
      ]);
    }
  };

  const deleteItemFromRightList = (key: any) => {
    if (isCat) {
      setCatAction(catAction.filter((item: any) => item.key !== key));
    } else {
      setBallAction(ballAction.filter((item: any) => item.key !== key));
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
        <FontAwesomeIcon icon={faBars} color={COLORS.white} />
        <Typography textColor="white" style={{ maxWidth: "70%" }}>
          {item.label}
        </Typography>
        <TouchableOpacity onPress={() => deleteItemFromRightList(item.key)}>
          <FontAwesomeIcon icon={faTrash} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={pageStyles.container}>
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
          <TouchableOpacity
            style={[
              pageStyles.head,

              base.mr_xs,
              showBall && base.w_48,
              isCat ? pageStyles.headActive : pageStyles.headNot,
            ]}
            disabled={!showBall}
            onPress={() => {
              setIsCat(true);
            }}
          >
            <Typography align="center" textColor={isCat ? "primary" : "black"}>
              CAT
            </Typography>
          </TouchableOpacity>
          {showBall && (
            <TouchableOpacity
              style={[
                pageStyles.head,
                base.w_48,
                !isCat ? pageStyles.headActive : pageStyles.headNot,
              ]}
              onPress={() => {
                setIsCat(false);
              }}
            >
              <Typography
                textColor={!isCat ? "primary" : "black"}
                align="center"
              >
                BALL
              </Typography>
            </TouchableOpacity>
          )}
        </View>
        <View style={pageStyles.underline}></View>
        <DraggableFlatList
          data={isCat ? catAction : ballAction}
          keyExtractor={(item: any) => item.key}
          renderItem={renderRightItem}
          onDragEnd={({ data }: DragEndParams<any>) =>
            isCat ? setCatAction(data) : setBallAction(data)
          }
        />
      </View>
    </GestureHandlerRootView>
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
  headNot: {
    ...base.p_s,
    borderWidth: 1,
    borderColor: COLORS.black,
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
