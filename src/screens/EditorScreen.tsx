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
import { Sprite } from "../utils/types";

type Coordinates = { x: number; y: number };

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
    dogAction,
    bananaAction,
    appleAction,
    showApple,
    showBanana,
    showDog,
    setShowDog,
    setShowBanana,
    setShowApple,
    setShowBall,
    setBallAction,
    setCatAction,
    setDogAction,
    setAppleAction,
    setBananaAction,
  } = useStore();

  const [showCat, setShowCat] = useState<boolean>(true);

  const [coordinates, setCoordinates] =
    useState<Coordinates>(initial_coordinates);

  const [catCoordinates, setCatCoordinates] =
    useState<Coordinates>(initial_coordinates);
  const [ballCoordinates, setBallCoordinates] =
    useState<Coordinates>(initial_coordinates);
  const [appleCoordinates, setAppleCoordinates] =
    useState<Coordinates>(initial_coordinates);
  const [bananaCoordinates, setBananaCoordinates] =
    useState<Coordinates>(initial_coordinates);
  const [dogCoordinates, setDogCoordinates] =
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

  const animatedAppleX = useRef(
    new Animated.Value(initial_coordinates.x)
  ).current;
  const animatedAppleY = useRef(
    new Animated.Value(initial_coordinates.y)
  ).current;
  const animatedAppleRotation = useRef(new Animated.Value(0)).current;

  const animatedBananaX = useRef(
    new Animated.Value(initial_coordinates.x)
  ).current;
  const animatedBananaY = useRef(
    new Animated.Value(initial_coordinates.y)
  ).current;
  const animatedBananaRotation = useRef(new Animated.Value(0)).current;

  const animatedDogX = useRef(
    new Animated.Value(initial_coordinates.x)
  ).current;
  const animatedDogY = useRef(
    new Animated.Value(initial_coordinates.y)
  ).current;
  const animatedDogRotation = useRef(new Animated.Value(0)).current;

  const animatedHelloOpacity = useRef(new Animated.Value(0)).current;
  const [helloText, setHelloText] = useState<string | null>(null);
  const helloCoordinates = useRef<Coordinates>(initial_coordinates);

  const { bg_white, m_xxs, container, br_5 } = base;

  function handleInfo(e: GestureResponderEvent, sprite: Sprite) {
    setCoordinates({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
    setSprite(sprite);
  }

  function changeCoordinates(sprite: Sprite, coordinates: Coordinates) {
    switch (sprite) {
      case "CAT":
        setCatCoordinates(coordinates);
        animatedCatX.setValue(coordinates.x);
        animatedCatY.setValue(coordinates.y);
        break;
      case "BALL":
        setBallCoordinates(coordinates);
        animatedBallX.setValue(coordinates.x);
        animatedBallY.setValue(coordinates.y);
        break;
      case "APPLE":
        setAppleCoordinates(coordinates);
        animatedAppleX.setValue(coordinates.x);
        animatedAppleY.setValue(coordinates.y);
        break;
      case "BANANA":
        setBananaCoordinates(coordinates);
        animatedBananaX.setValue(coordinates.x);
        animatedBananaY.setValue(coordinates.y);
        break;
      case "DOG":
        setDogCoordinates(coordinates);
        animatedDogX.setValue(coordinates.x);
        animatedDogY.setValue(coordinates.y);
        break;
    }
  }

  function handleReset() {
    setCatAction([]);
    setBallAction([]);
    setDogAction([]);
    setAppleAction([]);
    setBananaAction([]);
    changeCoordinates("CAT", initial_coordinates);
    changeCoordinates("BALL", initial_coordinates);
    changeCoordinates("APPLE", initial_coordinates);
    changeCoordinates("BANANA", initial_coordinates);
    changeCoordinates("DOG", initial_coordinates);
    setCoordinates(initial_coordinates);
    setShowBall(false);
    setShowCat(false);
    setShowApple(false);
    setShowBanana(false);
    setShowDog(false);
    setHelloText(null);
    setTimeout(() => {
      setShowCat(true);
    }, 100);
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
    let newAppleCoordinates = {
      x: appleCoordinates.x,
      y: appleCoordinates.y,
    };
    let newBananaCoordinates = {
      x: bananaCoordinates.x,
      y: bananaCoordinates.y,
    };
    let newDogCoordinates = {
      x: dogCoordinates.x,
      y: dogCoordinates.y,
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

    const appleAnimations = processActions(
      appleAction,
      newAppleCoordinates,
      animatedAppleX,
      animatedAppleY,
      animatedAppleRotation
    );
    const bananaAnimations = processActions(
      bananaAction,
      newBananaCoordinates,
      animatedBananaX,
      animatedBananaY,
      animatedBananaRotation
    );
    const dogAnimations = processActions(
      dogAction,
      newDogCoordinates,
      animatedDogX,
      animatedDogY,
      animatedDogRotation
    );

    setCatCoordinates(newCatCoordinates);
    setBallCoordinates(newBallCoordinates);
    setAppleCoordinates(newAppleCoordinates);
    setBananaCoordinates(newBananaCoordinates);
    setDogCoordinates(newDogCoordinates);

    Animated.parallel([
      Animated.sequence(catAnimations),
      Animated.sequence(ballAnimations),
      Animated.sequence(appleAnimations),
      Animated.sequence(bananaAnimations),
      Animated.sequence(dogAnimations),
    ]).start(() => {
      animatedCatRotation.setValue(0);
      animatedBallRotation.setValue(0);
      animatedAppleRotation.setValue(0);
      animatedBananaRotation.setValue(0);
      animatedDogRotation.setValue(0);
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
        {showApple && (
          <Animated.View
            style={{
              position: "absolute",
              left: animatedAppleX,
              top: animatedAppleY,
              transform: [
                {
                  rotate: animatedAppleRotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <Draggable
              imageSource={icons.apple as number}
              renderSize={DIMENSIONS.wp(15)}
              onPressIn={(e) => handleInfo(e, "APPLE")}
              onDragRelease={(e) => {
                handleInfo(e, "APPLE");
              }}
              x={appleCoordinates.x}
              y={appleCoordinates.y}
            />
          </Animated.View>
        )}
        {showBanana && (
          <Animated.View
            style={{
              position: "absolute",
              left: animatedBananaX,
              top: animatedBananaY,
              transform: [
                {
                  rotate: animatedBananaRotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <Draggable
              imageSource={icons.banana as number}
              renderSize={DIMENSIONS.wp(15)}
              onPressIn={(e) => handleInfo(e, "BANANA")}
              onDragRelease={(e) => {
                handleInfo(e, "BANANA");
              }}
              x={bananaCoordinates.x}
              y={bananaCoordinates.y}
            />
          </Animated.View>
        )}
        {showDog && (
          <Animated.View
            style={{
              position: "absolute",
              left: animatedDogX,
              top: animatedDogY,
              transform: [
                {
                  rotate: animatedDogRotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <Draggable
              imageSource={icons.dog as number}
              renderSize={DIMENSIONS.wp(20)}
              onPressIn={(e) => handleInfo(e, "DOG")}
              onDragRelease={(e) => {
                handleInfo(e, "DOG");
              }}
              x={dogCoordinates.x}
              y={dogCoordinates.y}
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
      <SpriteBar />
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
