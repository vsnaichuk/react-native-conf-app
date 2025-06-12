import React, { useLayoutEffect, useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Icon from "@expo/vector-icons/Ionicons";
// import SegmentedControl from "@react-native-segmented-control/segmented-control";
import SessionList from "../components/SessionList";
import ShareSocialFab from "../components/ShareSocialFab";
import { connect } from "../data/connect";
import { setSearchText } from "../data/sessions/sessions.actions";
import * as selectors from "../data/selectors";
import { type NavScreenProp, type RouteScreenProp } from "../navigation/types";
import Toast from "react-native-toast-message";
import { mockSchedule } from "../data/mocks";
import { ThemedView } from "../components/themed/ThemedView";
import { ThemedText } from "../components/themed/ThemedText";
import { CustomTheme } from "../res/colors";
import { Schedule } from "../models/Schedule";

type ListVariant = "all" | "favorites";

interface OwnProps {}

interface StateProps {
  schedule: Schedule;
  favoritesSchedule: Schedule;
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type ScheduleScreenProps = OwnProps & StateProps & DispatchProps;

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  setSearchText,
  ...props
}) => {
  const [listType, setListType] = useState<ListVariant>("all");
  const [favoriteSessions, setFavoriteSessions] = useState([2, 5]);
  const { t } = useTranslation();
  const { colors } = useTheme() as CustomTheme;
  const { params } = useRoute<RouteScreenProp<"Schedule">>();
  const navigation = useNavigation<NavScreenProp<"Schedule">>();

  const [segment, setSegment] = useState<"all" | "favorites">("all");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const favoritesSchedule = {
    ...mockSchedule,
    groups: mockSchedule.groups
      .map((group) => ({
        ...group,
        sessions: group.sessions.filter((session) =>
          favoriteSessions.includes(session.id)
        ),
      }))
      .filter((group) => group.sessions.length > 0),
  };

  const handleAddFavorite = (sessionId) => {
    setFavoriteSessions((prev) => [...prev, sessionId]);
  };

  const handleRemoveFavorite = (sessionId) => {
    setFavoriteSessions((prev) => prev.filter((id) => id !== sessionId));
  };

  const handleSessionPress = (session: { id: number }) => {
    navigation.navigate("SessionDetail", { id: session.id });
  };

  const showRefreshSuccessToast = () => {
    Toast.show({ type: "success", text1: t("schedule.refreshComplete") });
  };

  const doRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setRefreshing(false);
    showRefreshSuccessToast();
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setSearchText(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // @TODO: Uncomment to use SegmentedControl
      // headerTitle: () => (
      //   <SegmentedControl
      //     values={[t("schedule.all"), t("schedule.favorites")]}
      //     selectedIndex={segment === "all" ? 0 : 1}
      //     onChange={(event) => {
      //       setSegment(
      //         event.nativeEvent.selectedSegmentIndex === 0 ? "all" : "favorites"
      //       );
      //     }}
      //     style={styles.segmentControl}
      //   />
      // ),
      headerRight: ({ tintColor }) => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("SessionsFilter")}
        >
          <Icon name="options" size={24} color={tintColor} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInputContainer,
            { backgroundColor: colors.lightGray },
          ]}
        >
          <Icon
            name="search"
            size={20}
            color={colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>

      <SessionList
        schedule={listType === "all" ? mockSchedule : favoritesSchedule}
        listType={listType as ListVariant}
        hide={false}
        onSessionPress={handleSessionPress}
      />
      <ShareSocialFab />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: 44,
  },
});

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    schedule: selectors.getSearchedSchedule(state),
    favoritesSchedule: selectors.getGroupedFavorites(state),
  }),
  mapDispatchToProps: {
    setSearchText,
  },
  component: React.memo(ScheduleScreen),
});
