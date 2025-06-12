import { memo } from "react";
import { SafeAreaView, FlatList, Dimensions, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import SpeakerItem from "../components/SpeakerItem";
import { Speaker } from "../models/Speaker";
import { Session } from "../models/Schedule";
import { connect } from "../data/connect";
import * as selectors from "../data/selectors";
import { CustomTheme } from "../res/colors";
import { mockSpeakers, mockSpeakerSessions } from "../data/mocks";
import { ThemedView } from "../components/themed/ThemedView";

interface OwnProps {}

interface StateProps {
  speakers: Speaker[];
  speakerSessions: { [key: string]: Session[] };
}

interface DispatchProps {}

interface SpeakerListProps extends OwnProps, StateProps, DispatchProps {}

const SpeakerListScreen: React.FC<SpeakerListProps> = ({
  speakers,
  speakerSessions,
}) => {
  const { colors } = useTheme() as CustomTheme;
  const screenWidth = Dimensions.get("window").width;

  // Determine number of columns based on screen width (similar to Ionic's responsive behavior)
  const numColumns = screenWidth > 768 ? 2 : 1;

  // Use mock data if no real data is available (for testing)
  const displaySpeakers = speakers?.length > 0 ? speakers : mockSpeakers;
  const displaySessions =
    Object.keys(speakerSessions).length > 0
      ? speakerSessions
      : mockSpeakerSessions;

  const renderSpeaker = ({ item: speaker }: { item: Speaker }) => (
    <ThemedView
      style={[styles.speakerColumn, { width: screenWidth / numColumns - 20 }]}
    >
      <SpeakerItem
        speaker={speaker}
        sessions={displaySessions[speaker.name] || []}
      />
    </ThemedView>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={displaySpeakers}
        renderItem={renderSpeaker}
        keyExtractor={(speaker) => speaker.id.toString()}
        numColumns={numColumns}
        key={numColumns} // Force re-render when columns change
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  speakerColumn: {
    margin: 5,
  },
});

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    speakers: selectors.getSpeakers(state),
    speakerSessions: selectors.getSpeakerSessions(state),
  }),
  component: memo(SpeakerListScreen),
});
