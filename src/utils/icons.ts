import { ImageSourcePropType } from "react-native";

const cat = require("../assets/images/cat.png");
const ball = require("../assets/images/ball.png");
const banana = require("../assets/images/banana.png");
const apple = require("../assets/images/apple.png");
const dog = require("../assets/images/dog.png");

export const icons: Record<string, ImageSourcePropType> = {
  cat,
  ball,
  banana,
  apple,
  dog
};
