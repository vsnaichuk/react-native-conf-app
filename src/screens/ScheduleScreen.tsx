import type {} from "../navigation/NativeStack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@react-navigation/elements";
import { HeaderHeightView } from "../components/HeaderHeightView";
import { useNavigation, useRoute } from "@react-navigation/core";
import type { StackNavigation, StackRoute } from "../navigation/types";

export const ScheduleScreen = () => {
  const { params } = useRoute<StackRoute<"Test">>();
  const navigation = useNavigation<StackNavigation<"Test">>();

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Test Params: {params?.id}</Text>
        <View style={styles.buttons}>
          <Button variant="tinted" onPress={() => navigation.pop()}>
            Pop screen
          </Button>
        </View>
      </ScrollView>
      <HeaderHeightView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 12,
  },
});
