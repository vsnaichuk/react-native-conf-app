import "@expo/metro-runtime"; // Necessary for Fast Refresh on Web
import "./gesture-handler";

import { Assets } from "@react-navigation/elements";
import { registerRootComponent } from "expo";
import { Asset } from "expo-asset";

import { App } from "./src/index";

Asset.loadAsync(Assets);

registerRootComponent(() => <App />);
