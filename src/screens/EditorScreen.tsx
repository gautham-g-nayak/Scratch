import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { base } from "../assets/styles";
import Draggable from "react-native-draggable";
import { icons } from "../utils/icons";
import { COLORS, DIMENSIONS, SIZES } from "../utils/constants";
import InfoBar from "../components/InfoBar";
import SpriteBar from "../components/SpriteBar";
import Typography from "../components/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../store/store";

type Coordinates = { x: number; y: number };
type Sprite = "CAT" | "BALL";

function EditorScreen(): JSX.Element {
  const initial_coordinates = {
    x: 0,
    y: 0,
  };
  const [sprite, setSprite] = useState<Sprite>("CAT");
  const {
    showBall,
    catAction,
    ballAction,
    setShowBall,
    setBallAction,
    setCatAction,
  } = useStore();
  const [showCat, setShowCat] = useState<Boolean>(true);
  const [coordinates, setCoordinates] =
    useState<Coordinates>(initial_coordinates);
  const [catCoordinates, setCatCoordinates] =
    useState<Coordinates>(initial_coordinates);
  const [ballCoordinates, setBallCoordinates] =
    useState<Coordinates>(initial_coordinates);

  const animatedCatX = useRef(
    new Animated.Value(initial_coordinates.x)
  ).current;
  const animatedCatY = useRef(
    new Animated.Value(initial_coordinates.y)
  ).current;
  const animatedCatRotation = useRef(new Animated.Value(0)).current;

  const animatedBallX = useRef(
    new Animated.Value(initial_coordinates.x)
  ).current;
  const animatedBallY = useRef(
    new Animated.Value(initial_coordinates.y)
  ).current;
  const animatedBallRotation = useRef(new Animated.Value(0)).current;

  const animatedHelloOpacity = useRef(new Animated.Value(0)).current;
  const [helloText, setHelloText] = useState<string | null>(null);
  const helloCoordinates = useRef<Coordinates>(initial_coordinates);

  const { bg_white, m_xxs, container, br_5 } = base;

  function handleInfo(e: GestureResponderEvent, sprite: Sprite) {
    setCoordinates({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
    setSprite(sprite);
  }

  function changeCatCoordinates(coordinates: Coordinates) {
    setCatCoordinates(coordinates);
    animatedCatX.setValue(coordinates.x);
    animatedCatY.setValue(coordinates.y);
  }

  function changeBallCoordinates(coordinates: Coordinates) {
    setBallCoordinates(coordinates);
    animatedBallX.setValue(coordinates.x);
    animatedBallY.setValue(coordinates.y);
  }

  function handleReset() {
    setCatAction([]);
    setBallAction([]);
    changeBallCoordinates(initial_coordinates);
    changeCatCoordinates(initial_coordinates);
    setCoordinates(initial_coordinates);
    setShowBall(false);
    setShowCat(false);
    setHelloText(null);
    setTimeout(() => {
      setShowCat(true);
    }, 100);
  }

  function handleShowBall(isShow: boolean = true) {
    setShowBall(isShow);
  }

  function handleShowCat(isShow: boolean = true) {
    setShowCat(isShow);
  }

  function handlePlay() {
    const processActions = (
      actions: any[],
      coordinates: Coordinates,
      animatedX: Animated.Value,
      animatedY: Animated.Value,
      animatedRotation: Animated.Value
    ): Animated.CompositeAnimation[] => {
      let repeatIndex = -1;
      const animations: Animated.CompositeAnimation[] = [];

      actions.forEach((action, index) => {
        if (action.action.repeat) {
          repeatIndex = index;
        } else if ("x" in action.action && "y" in action.action) {
          coordinates.x += action.action.x;
          coordinates.y += action.action.y;
          animations.push(
            Animated.parallel([
              Animated.timing(animatedX, {
                toValue: coordinates.x,
                duration: 500,
                useNativeDriver: false,
              }),
              Animated.timing(animatedY, {
                toValue: coordinates.y,
                duration: 500,
                useNativeDriver: false,
              }),
            ])
          );
        } else if ("rotate" in action.action) {
          animations.push(
            Animated.timing(animatedRotation, {
              toValue: action.action.rotate,
              duration: 1000,
              useNativeDriver: false,
            })
          );
        } else if ("sayHello" in action.action) {
          setHelloText("Hello");
          helloCoordinates.current = {
            x: coordinates.x + DIMENSIONS.wp(20) / 2,
            y: coordinates.y - 20,
          };
          animations.push(
            Animated.sequence([
              Animated.timing(animatedHelloOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
              }),
              Animated.timing(animatedHelloOpacity, {
                toValue: 0,
                duration: 500,
                delay: 1000,
                useNativeDriver: false,
              }),
            ])
          );
        }
      });

      if (repeatIndex !== -1) {
        const repeatedActions = actions.slice(0, repeatIndex);
        animations.push(
          ...processActions(
            repeatedActions,
            coordinates,
            animatedX,
            animatedY,
            animatedRotation
          )
        );
      }

      return animations;
    };

    let newCatCoordinates = {
      x: catCoordinates.x,
      y: catCoordinates.y,
    };
    let newBallCoordinates = {
      x: ballCoordinates.x,
      y: ballCoordinates.y,
    };

    const catAnimations = processActions(
      catAction,
      newCatCoordinates,
      animatedCatX,
      animatedCatY,
      animatedCatRotation
    );
    const ballAnimations = processActions(
      ballAction,
      newBallCoordinates,
      animatedBallX,
      animatedBallY,
      animatedBallRotation
    );

    setCatCoordinates(newCatCoordinates);
    setBallCoordinates(newBallCoordinates);

    Animated.parallel([
      Animated.sequence(catAnimations),
      Animated.sequence(ballAnimations),
    ]).start(() => {
      animatedCatRotation.setValue(0);
      animatedBallRotation.setValue(0);
    });
  }

  return (
    <View style={pageStyles.container}>
      <View style={[bg_white, m_xxs, container, br_5, pageStyles.border]}>
        {showCat && (
          <Animated.View
            style={{
              position: "absolute",
              left: animatedCatX,
              top: animatedCatY,
              transform: [
                {
                  rotate: animatedCatRotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <Draggable
              imageSource={icons.cat as number}
              renderSize={DIMENSIONS.wp(20)}
              onPressIn={(e) => {
                handleInfo(e, "CAT");
              }}
              onDragRelease={(e) => {
                handleInfo(e, "CAT");
              }}
              x={catCoordinates.x}
              y={catCoordinates.y}
            />
          </Animated.View>
        )}
        {showBall && (
          <Animated.View
            style={{
              position: "absolute",
              left: animatedBallX,
              top: animatedBallY,
              transform: [
                {
                  rotate: animatedBallRotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <Draggable
              imageSource={icons.ball as number}
              renderSize={DIMENSIONS.wp(15)}
              onPressIn={(e) => handleInfo(e, "BALL")}
              onDragRelease={(e) => {
                handleInfo(e, "BALL");
              }}
              x={ballCoordinates.x}
              y={ballCoordinates.y}
            />
          </Animated.View>
        )}
        {helloText && (
          <Animated.View
            style={{
              position: "absolute",
              left: helloCoordinates.current.x,
              top: helloCoordinates.current.y,
              opacity: animatedHelloOpacity,
            }}
          >
            <Text style={pageStyles.helloText}>{helloText}</Text>
          </Animated.View>
        )}
      </View>
      <View style={base.row}>
        <TouchableOpacity
          style={pageStyles.buttonContainer}
          onPress={handleReset}
        >
          <View style={pageStyles.box}>
            <FontAwesomeIcon icon={faRefresh} color={COLORS.white} />
            <Typography textColor="white"> Reset</Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={pageStyles.buttonContainer}
          onPress={handlePlay}
        >
          <View style={pageStyles.box}>
            <FontAwesomeIcon icon={faPlay} color={COLORS.white} />
            <Typography textColor="white"> Play</Typography>
          </View>
        </TouchableOpacity>
      </View>
      <InfoBar sprite={sprite} coordinates={coordinates} />
      <SpriteBar showBall={showBall} handleShowBall={handleShowBall} />
    </View>
  );
}

const pageStyles = StyleSheet.create({
  container: {
    ...base.container,
    ...base.bg_light,
  },
  box: {
    ...base.row,
    ...base.align_center,
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonContainer: {
    ...base.m_xxs,
    ...base.mt_0,
    ...base.p_xs,
    ...base.row,
    borderRadius: SIZES.xl,
    backgroundColor: COLORS.primary,
  },
  draggableBox: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  helloText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditorScreen;
