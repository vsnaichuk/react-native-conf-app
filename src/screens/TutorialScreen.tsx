import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Ionicons";
import { connect } from "../data/connect";
import { setMenuEnabled } from "../data/sessions/sessions.actions";
import { setHasSeenTutorial } from "../data/user/user.actions";
import { ThemedView } from "../components/themed/ThemedView";
import { CustomTheme } from "../res/colors";

interface OwnProps {}
interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}
type TutorialScreenProps = OwnProps & DispatchProps;

const tutorialSlides = [
  {
    id: 1,
    image: "https://reactjs.org/logo-og.png",
    title: "Welcome to ICA",
    description:
      "The ionic conference app is a practical preview of the ionic framework in action, and a demonstration of proper code use.",
    boldText: "ionic conference app",
  },
  {
    id: 2,
    image: "https://reactjs.org/logo-og.png",
    title: "What is Ionic?",
    description:
      "Ionic Framework is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
    boldText: "Ionic Framework",
  },
  {
    id: 3,
    image: "https://reactjs.org/logo-og.png",
    title: "What is Ionic Appflow?",
    description:
      "Ionic Appflow is a powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.",
    boldText: "Ionic Appflow",
  },
  {
    id: 4,
    image: "https://reactjs.org/logo-og.png",
    title: "Ready to Play?",
    description: "",
    boldText: "",
    showContinueButton: true,
  },
];

const TutorialScreen: React.FC<TutorialScreenProps> = ({
  setHasSeenTutorial,
  setMenuEnabled,
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme() as CustomTheme;
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    setMenuEnabled(false);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
    return () => {
      setMenuEnabled(true);
    };
  }, [setMenuEnabled]);

  const startApp = async () => {
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    navigation.navigate("Home");
  };

  const renderTextWithBold = (text: string, boldText: string) => {
    if (!boldText)
      return (
        <Text style={[styles.description, { color: colors.text }]}>{text}</Text>
      );

    const parts = text.split(boldText);
    return (
      <Text style={[styles.description, { color: "#60646b" }]}>
        {parts.map((part, index) => (
          <Text key={index}>
            {part}
            {index < parts.length - 1 && (
              <Text style={[styles.boldText, { color: colors.text }]}>
                {boldText}
              </Text>
            )}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerSpacer} />
        <TouchableOpacity style={styles.headerButton} onPress={startApp}>
          <Text style={[styles.skipText, { color: colors.primary }]}>Skip</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        style={styles.slider}
      >
        {tutorialSlides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <Image
              source={{ uri: slide.image }}
              style={styles.slideImage}
              resizeMode="cover"
            />
            <Text style={[styles.title, { color: colors.text }]}>
              {renderTextWithBold(slide.title, slide.boldText)}
            </Text>
            {slide.description &&
              renderTextWithBold(slide.description, slide.boldText)}
            {slide.showContinueButton && (
              <TouchableOpacity
                style={styles.continueButton}
                onPress={startApp}
              >
                <Text style={[styles.continueText, { color: colors.primary }]}>
                  Continue
                </Text>
                <Icon name="arrow-forward" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerSpacer: {
    width: 50,
  },
  headerButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "500",
  },
  slider: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  slideImage: {
    width: 300,
    height: 300,
    // aspectRatio: 1,
  },
  title: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    color: "#60646b",
  },
  boldText: {
    fontWeight: "500",
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  continueText: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
});

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setHasSeenTutorial,
    setMenuEnabled,
  },
  component: TutorialScreen,
});
