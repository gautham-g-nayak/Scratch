import React, { useState, useRef } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { COLORS, DIMENSIONS, SIZES } from "../utils/constants";
import { base } from "../assets/styles";
import Typography from "./Typography";

type Props = {
  callback: (s: string) => void;
  options: DrawerOption[];
  children: JSX.Element;
  showDivider?: boolean;
};

type DrawerOption = {
  label: string;
  onPress: (o: DrawerOption) => void;
};

function Drawer({
  callback,
  children,
  options,
  showDivider = false,
}: Props): JSX.Element {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const trigger = useRef<TouchableOpacity>(null);

  const toggle = () => {
    setShowDrawer((prev) => {
      if (!prev) {
        trigger.current?.measure((_fx, _fy, _w, h, _px, py) => {
          const height = py - h * 2;
          setTop(height);
        });
      }
      return !prev;
    });
  };

  const { row, align_center, bg_white, container, bg_modal, w_100 } = base;
  const { drawer, optionStyle, divider, dividerStyle } = pageStyles;

  const renderOptions = () => {
    return options.map((option, index) => {
      const handlePress = () => {
        option.onPress(option);
        callback?.(option.label);
        toggle();
      };

      return (
        <View style={{ paddingVertical: 4 }} key={option.label}>
          <TouchableOpacity
            key={option.label}
            onPress={handlePress}
            style={[row, align_center, optionStyle]}
          >
            <Typography>{option.label}</Typography>
          </TouchableOpacity>
          {index + 2 === options.length && showDivider && (
            <View style={dividerStyle}>
              <View style={divider} />
            </View>
          )}
        </View>
      );
    });
  };

  const renderDrawer = () => {
    return (
      <Modal
        visible={showDrawer}
        transparent={true}
        animationType="fade"
        onRequestClose={toggle}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggle}
          style={[container, bg_modal]}
        >
          <View style={[bg_white, drawer, w_100]}>{renderOptions()}</View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity onPress={toggle} ref={trigger}>
      {children}
      {renderDrawer()}
    </TouchableOpacity>
  );
}

const pageStyles = StyleSheet.create({
  drawer: {
    position: "absolute",
    bottom: 0,
    padding: DIMENSIONS.hp(1.5),
    borderTopLeftRadius: SIZES.base,
    borderTopRightRadius: SIZES.base,
  },
  optionStyle: { padding: DIMENSIONS.hp(1.2) },
  dividerStyle: { padding: DIMENSIONS.hp(0.5) },
  divider: { height: 1, backgroundColor: COLORS.border, flex: 1 },
});

export default Drawer;
