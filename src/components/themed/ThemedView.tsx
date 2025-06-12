import { View, type ViewProps } from "react-native";

import { useThemeColor } from "../../hooks/useThemeColor";
import { Color as ThemeColor } from "../../res/colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  color?: ThemeColor;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  color,
  ...props
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color ?? "background"
  );

  return <View style={[{ backgroundColor }, style]} {...props} />;
}
