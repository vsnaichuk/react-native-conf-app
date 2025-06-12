import { Text, useHeaderHeight } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { useAnimatedHeaderHeight } from "@react-navigation/native-stack";
import { Animated, Platform, StyleSheet } from "react-native";

export const HeaderHeightView = ({
  hasOffset = Platform.OS === "ios",
}: {
  hasOffset?: boolean;
}) => {
  const { colors } = useTheme();

  const animatedHeaderHeight = useAnimatedHeaderHeight();
  const headerHeight = useHeaderHeight();

  return (
    <Animated.View
      style={[
        styles.headerHeight,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        hasOffset && {
          transform: [{ translateY: animatedHeaderHeight }],
        },
      ]}
    >
      <Text>{headerHeight.toFixed(2)}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerHeight: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
  },
});
