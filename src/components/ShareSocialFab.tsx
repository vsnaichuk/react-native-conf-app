import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../res/colors';
import {makeStyles} from '../util/styles';

const ShareSocialFab: React.FC = () => {
  const theme = useTheme() as CustomTheme;
  const styles = useStyles(theme);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  const fabScale = useSharedValue(0);

  const openSocial = (network: string) => {
    setLoadingMessage(`Posting to ${network}`);
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 2000); // Mimic IonLoading duration
  };

  const toggleFab = () => {
    setIsFabOpen(!isFabOpen);
    fabScale.value = isFabOpen ? 0 : 1;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: withSpring(fabScale.value, {duration: 250})}],
    opacity: withSpring(fabScale.value, {duration: 250}),
  }));

  return (
    <>
      <Modal
        transparent
        animationType="fade"
        visible={showLoading}
        onRequestClose={() => setShowLoading(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>{loadingMessage}</Text>
          </View>
        </View>
      </Modal>
      <View style={styles.fabContainer}>
        <Animated.View style={[styles.fabList, animatedStyles]}>
          <TouchableOpacity
            style={[styles.fabButton, styles.vimeoButton]}
            onPress={() => openSocial('Vimeo')}>
            <Icon name="logo-vimeo" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fabButton, styles.instagramButton]}
            onPress={() => openSocial('Instagram')}>
            <Icon name="logo-instagram" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fabButton, styles.twitterButton]}
            onPress={() => openSocial('Twitter')}>
            <Icon name="logo-twitter" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fabButton, styles.facebookButton]}
            onPress={() => openSocial('Facebook')}>
            <Icon name="logo-facebook" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.mainFab} onPress={toggleFab}>
          <Icon
            name={isFabOpen ? 'close' : 'share-social'}
            size={30}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const useStyles = makeStyles((theme: CustomTheme) => ({
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
  },
  mainFab: {
    backgroundColor: theme.colors.white,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabList: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 72, // Position above main FAB
  },
  fabButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  vimeoButton: {
    backgroundColor: '#1ab7ea', // Vimeo brand color
  },
  instagramButton: {
    backgroundColor: '#e1306c', // Instagram brand color
  },
  twitterButton: {
    backgroundColor: '#1da1f2', // Twitter brand color
  },
  facebookButton: {
    backgroundColor: '#3b5998', // Facebook brand color
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    maxHeight: '80%',
  },
  loadingContainer: {
    backgroundColor: theme.colors.background,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: theme.colors.text,
    marginTop: 10,
    fontSize: 16,
  },
}));

export default ShareSocialFab;
