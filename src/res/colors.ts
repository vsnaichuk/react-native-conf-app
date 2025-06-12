import {
  Theme as DefaultThemeType,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    white: "#fff",
    background: "#fff",
    lightGray: "#f4f5f8",
    secondary: "#0163aa",
    tertiary: "#6030ff",
    success: "#2dd55b",
    error: "#ff0000",
    textSecondary: "#757575",
    favorite: "#69bb7b",
    twitter: "#1da1f4",
    instagram: "#9537BC",
    vimeo: "#23b6ea",
    facebook: "#3b5998",
    github: "#211F1F",
    react: "#61dbfb",
    communication: "#8e8d93",
    tooling: "#fe4c52",
    services: "#fd8b2d",
    design: "#fed035",
    workshop: "#69bb7b",
    food: "#3bc7c4",
    documentation: "#b16be3",
    navigation: "#6600cc",
  },
} as const;

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    white: "#fff",
    background: "#000",
    lightGray: "#f4f5f8",
    secondary: "#0163aa",
    tertiary: "#6030ff",
    success: "#2dd55b",
    error: "#ff0000",
    textSecondary: "#9e9e9e",
    favorite: "#69bb7b",
    twitter: "#1da1f4",
    instagram: "#9537BC",
    vimeo: "#23b6ea",
    facebook: "#3b5998",
    github: "#211F1F",
    react: "#61dbfb",
    communication: "#8e8d93",
    tooling: "#fe4c52",
    services: "#fd8b2d",
    design: "#fed035",
    workshop: "#69bb7b",
    food: "#3bc7c4",
    documentation: "#b16be3",
    navigation: "#6600cc",
  },
} as const;

export type CustomColors = (typeof lightTheme)["colors"];
export type Color = keyof CustomColors;
export type CustomTheme = DefaultThemeType & {
  colors: DefaultThemeType["colors"] & CustomColors;
};

export default {};
