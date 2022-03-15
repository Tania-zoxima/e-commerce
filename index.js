import { AppRegistry, Platform } from "react-native";
import App from "./App/App";
import { name as appName } from "./app.json";
import { name as appNameIos } from "./appIos.json";
import Bugsnag from "@bugsnag/react-native";

import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
if (Platform.OS == "android") {
  AppRegistry.registerComponent(appName, () => App);
} else {
  AppRegistry.registerComponent(appNameIos, () => App);
}

Bugsnag.start();
