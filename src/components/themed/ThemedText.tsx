import { Text, type TextProps, type TextStyle, StyleSheet } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Color as ThemeColor } from "../../res/colors";

export type TextPreset = keyof typeof sizeStyles;
export type WeightPreset = keyof typeof weightStyles;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  color?: ThemeColor;
  preset?: TextPreset;
  weight?: WeightPreset;
};

const weightStyles = {
  bold: { fontWeight: "700" } satisfies TextStyle,
  semiBold: { fontWeight: "600" } satisfies TextStyle,
  medium: { fontWeight: "500" } satisfies TextStyle,
  regular: { fontWeight: "400" } satisfies TextStyle,
  light: { fontWeight: "300" } satisfies TextStyle,
} as const;

const sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
} as const;

const styles = StyleSheet.create({
  ...sizeStyles,
  ...weightStyles,
});

export function ThemedText({
  style,
  lightColor,
  darkColor,
  color,
  preset = "sm",
  weight = "regular",
  ...props
}: ThemedTextProps) {
  const themedColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color ?? "text"
  );

  return (
    <Text
      style={[styles[preset], styles[weight], { color: themedColor }, style]}
      {...props}
    />
  );
}
