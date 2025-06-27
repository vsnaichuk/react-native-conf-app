import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  ActionSheetIOS,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from '@expo/vector-icons/Ionicons';
import { connect } from '../data/connect';
import { Speaker } from '../models/Speaker';
import { ThemedView } from '../components/themed/ThemedView';
import { ThemedText } from '../components/themed/ThemedText';

interface OwnProps {}

interface StateProps {
  speaker?: Speaker;
}

interface DispatchProps {}

type SpeakerDetailScreenProps = OwnProps & StateProps & DispatchProps;

const SpeakerDetailScreen: React.FC<SpeakerDetailScreenProps> = ({
  speaker: propSpeaker,
}) => {
  const speaker = propSpeaker;
  const [profilePic, setProfilePic] = useState(speaker.profilePic);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const onProfilePicError = () => {
    setProfilePic('https://www.gravatar.com/avatar?d=mm&s=140');
  };

  const openSpeakerShare = (speaker: Speaker) => {
    const options = ['Copy Link', 'Share via...', 'Cancel'];
    const cancelButtonIndex = 2;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          title: `Share ${speaker.name}`,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            console.log('Copy Link clicked');
          } else if (buttonIndex === 1) {
            console.log('Share via clicked');
          }
        }
      );
    } else {
      Alert.alert(`Share ${speaker.name}`, '', [
        { text: 'Copy Link', onPress: () => console.log('Copy Link clicked') },
        {
          text: 'Share via...',
          onPress: () => console.log('Share via clicked'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  const openContact = (speaker: Speaker) => {
    const options = [
      `Email (${speaker.email})`,
      `Call (${speaker.phone})`,
      'Cancel',
    ];
    const cancelButtonIndex = 2;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          title: `Contact ${speaker.name}`,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            Linking.openURL(`mailto:${speaker.email}`);
          } else if (buttonIndex === 1) {
            Linking.openURL(`tel:${speaker.phone}`);
          }
        }
      );
    } else {
      Alert.alert(`Contact ${speaker.name}`, '', [
        {
          text: `Email (${speaker.email})`,
          onPress: () => Linking.openURL(`mailto:${speaker.email}`),
        },
        {
          text: `Call (${speaker.phone})`,
          onPress: () => Linking.openURL(`tel:${speaker.phone}`),
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  const openExternalUrl = (url: string) => {
    Linking.openURL(url);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ThemedText weight="semiBold">{speaker?.name}</ThemedText>
      ),
    });
  }, [navigation]);

  if (!speaker) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No speaker data available</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* <View style={[styles.header, {backgroundColor: colors.card}]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color={colors.text} />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => openContact(speaker)}>
            <Icon name="call-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => openSpeakerShare(speaker)}>
            <Icon name="share-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View> */}

      <ScrollView style={styles.content}>
        <View style={styles.speakerBackground}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={{ uri: profilePic }}
                style={styles.profileImage}
                onError={onProfilePicError}
              />
            </View>
          </View>
          <ThemedText style={styles.speakerName}>{speaker.name}</ThemedText>
        </View>

        <View style={styles.speakerDetail}>
          <ThemedText style={styles.aboutText}>
            {speaker.about} Say hello on social media!
          </ThemedText>

          <View style={styles.separator} />

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialChip, styles.twitterChip]}
              onPress={() =>
                openExternalUrl(`https://twitter.com/${speaker.twitter}`)
              }
            >
              <Icon name="logo-twitter" size={20} color="#1DA1F2" />
              <Text style={[styles.socialLabel, { color: '#1DA1F2' }]}>
                Twitter
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialChip, styles.githubChip]}
              onPress={() =>
                openExternalUrl('https://github.com/ionic-team/ionic-framework')
              }
            >
              <Icon name="logo-github" size={20} color="#333" />
              <Text style={[styles.socialLabel, { color: '#333' }]}>
                GitHub
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialChip, styles.instagramChip]}
              onPress={() =>
                openExternalUrl('https://instagram.com/ionicframework')
              }
            >
              <Icon name="logo-instagram" size={20} color="#E4405F" />
              <Text style={[styles.socialLabel, { color: '#E4405F' }]}>
                Instagram
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, props) => {
    const route = props.route;
    const speakerId = route?.params?.id;
    return {
      speaker: state.data.speakers.find(
        (s) => String(s.id) === String(speakerId)
      ),
    };
  },
  component: SpeakerDetailScreen,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backText: {
    marginLeft: 4,
    fontSize: 17,
  },
  headerActions: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  speakerBackground: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    // @TODO: Fix this AI generated style
    // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    padding: 4,
    backgroundColor: 'white',
  },
  profileImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 56,
  },
  speakerName: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  speakerDetail: {
    padding: 20,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  twitterChip: {
    borderColor: '#1DA1F2',
    backgroundColor: '#f0f8ff',
  },
  githubChip: {
    borderColor: '#333',
    backgroundColor: '#f6f8fa',
  },
  instagramChip: {
    borderColor: '#E4405F',
    backgroundColor: '#fdf2f8',
  },
  socialLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});
