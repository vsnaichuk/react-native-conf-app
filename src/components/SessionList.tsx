import React, { useRef, useState } from "react";
import { FlatList, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../res/colors";
import { connect } from "../data/connect";
import { ThemedView } from "./themed/ThemedView";
import { ThemedText } from "./themed/ThemedText";
import { addFavorite, removeFavorite } from "../data/sessions/sessions.actions";
import { AppState } from "../data/state";
import { Schedule, Session } from "../models/Schedule";
import SessionListItem from "./SessionListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface OwnProps {
  schedule: Schedule;
  listType: "all" | "favorites";
  hide: boolean;
  onSessionPress: (session: Session) => void;
}

interface StateProps {
  favoriteSessions: number[];
}

interface DispatchProps {
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

interface SessionListProps extends OwnProps, StateProps, DispatchProps {}

const SessionList: React.FC<SessionListProps> = ({
  addFavorite,
  removeFavorite,
  favoriteSessions,
  onSessionPress,
  hide,
  schedule,
  listType,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as CustomTheme;
  const flatListRef = useRef<FlatList>(null);

  const handleAddFavorite = (sessionId: number) => {
    console.log("Adding favorite:", sessionId);
    addFavorite?.(sessionId);
  };

  const handleRemoveFavorite = (sessionId: number) => {
    console.log("Removing favorite:", sessionId);
    removeFavorite?.(sessionId);
  };

  if (hide) {
    return null;
  }

  if (schedule.groups.length === 0) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <ThemedText
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          No Sessions Found
        </ThemedText>
      </ThemedView>
    );
  }

  const renderGroup = ({
    item,
    index,
  }: {
    item: { time: string; sessions: Session[] };
    index: number;
  }) => (
    <ThemedView key={`group-${index}`}>
      <ThemedView
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: theme.colors.lightGray,
        }}
      >
        <ThemedText
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: theme.colors.text,
          }}
        >
          {item.time}
        </ThemedText>
      </ThemedView>
      {item.sessions.map((session: Session, sessionIndex: number) => (
        <SessionListItem
          onPress={onSessionPress}
          onShowAlert={Alert.alert}
          isFavorite={favoriteSessions.includes(session.id)}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          key={`group-${index}-${sessionIndex}`}
          session={session}
          listType={listType}
        />
      ))}
    </ThemedView>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={schedule.groups}
      renderItem={renderGroup}
      keyExtractor={(_, index) => `group-${index}`}
      style={hide ? { display: "none" } : undefined}
      contentContainerStyle={[
        { backgroundColor: theme.colors.background },
        { paddingBottom: insets.bottom },
      ]}
    />
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state: AppState) => ({
    favoriteSessions: state.data.favorites,
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite,
  },
  component: SessionList,
});
