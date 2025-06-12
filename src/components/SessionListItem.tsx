import React, {useRef} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import {useTheme} from '@react-navigation/native';
import {Color, CustomTheme} from '../res/colors';
import {Session} from '../models/Schedule';
import {ThemedText} from './themed/ThemedText';

const RightAction = (props: {
  session: Session;
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  listType: 'all' | 'favorites';
  addFavoriteSession: () => void;
  removeFavoriteSession: (title: string) => void;
}) => {
  const theme = useTheme() as CustomTheme;
  const styleAnimation = useAnimatedStyle(() => ({
    transform: [{translateX: props.drag.value + 100}], // Adjust based on action width
  }));

  return (
    <Reanimated.View style={[styles.rightActions, styleAnimation]}>
      {props.listType === 'favorites' ? (
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: theme.colors.error}]}
          onPress={() => props.removeFavoriteSession('Remove Favorite')}>
          <ThemedText
            preset="sm"
            weight="medium"
            style={{color: theme.colors.white}}>
            Remove
          </ThemedText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.actionButton,
            {backgroundColor: theme.colors.favorite},
          ]}
          onPress={props.addFavoriteSession}>
          <ThemedText
            preset="sm"
            weight="medium"
            style={{color: theme.colors.white}}>
            Favorite
          </ThemedText>
        </TouchableOpacity>
      )}
    </Reanimated.View>
  );
};

interface SessionListItemProps {
  session: Session;
  listType: 'all' | 'favorites';
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (
    header: string,
    message: string,
    buttons: {text: string; onPress?: () => void}[],
  ) => void;
  isFavorite: boolean;
  onPress: (session: Session) => void;
}

const SessionListItem: React.FC<SessionListItemProps> = ({
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
  onShowAlert,
  onPress,
  session,
  listType,
}) => {
  const {colors} = useTheme() as CustomTheme;
  const track = session.tracks[0].toLowerCase() as Color;
  const swipeableRef = useRef<SwipeableMethods>(null);

  const dismissAlert = () => {
    swipeableRef.current?.close();
  };

  const removeFavoriteSession = (title: string) => {
    onAddFavorite(session.id);
    onShowAlert(
      title,
      'Would you like to remove this session from your favorites?',
      [
        {
          text: 'Cancel',
          onPress: dismissAlert,
        },
        {
          text: 'Remove',
          onPress: () => {
            onRemoveFavorite(session.id);
            dismissAlert();
          },
        },
      ],
    );
  };

  const addFavoriteSession = async () => {
    if (isFavorite) {
      removeFavoriteSession('Favorite already added');
    } else {
      onAddFavorite(session.id);
      swipeableRef.current?.close();
      Toast.show({
        type: 'success',
        text1: `${session.name} was successfully added as a favorite.`,
        autoHide: true,
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={(
        progressAnimatedValue: SharedValue<number>,
        dragAnimatedValue: SharedValue<number>,
      ) => (
        <RightAction
          prog={progressAnimatedValue}
          drag={dragAnimatedValue}
          listType={listType}
          session={session}
          addFavoriteSession={addFavoriteSession}
          removeFavoriteSession={removeFavoriteSession}
        />
      )}
      containerStyle={[
        styles.container,
        {backgroundColor: colors.background, borderBottomColor: colors.border},
      ]}>
      <TouchableOpacity
        style={[
          styles.sessionButton,
          track && colors[track] ? {backgroundColor: `${colors[track]}20`} : {},
        ]}
        onPress={() => onPress(session)}>
        <ThemedText preset="md" weight="semiBold">
          {session.name}
        </ThemedText>
        <ThemedText preset="xs" style={styles.sessionTime}>
          {session.timeStart} — {session.timeEnd}: {session.location}
        </ThemedText>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  rightActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  sessionButton: {
    padding: 16,
  },
  sessionTime: {
    marginTop: 4,
  },
});

export default React.memo(SessionListItem);
