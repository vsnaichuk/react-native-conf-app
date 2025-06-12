import { Button, Text } from "@react-navigation/elements";
import type { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import type { RootStackParamList } from "../navigation/types";

export const NotFound = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 Not Found ({route.path})</Text>
      <Button
        variant="filled"
        onPress={() => navigation.navigate("Drawer", { screen: "BottomTabs" })}
        style={styles.button}
      >
        Go to home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  button: {
    margin: 24,
  },
});
