import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ThemedView } from "../components/themed/ThemedView";
import { ThemedText } from "../components/themed/ThemedText";
import { CustomTheme } from "../res/colors";
import { setIsLoggedIn, setUsername } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { NavScreenProp } from "../navigation/types";
import { images } from "../res/constants";

interface LoginProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

const LoginScreen: React.FC<LoginProps> = ({
  setIsLoggedIn,
  setUsername: setUsernameAction,
}) => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation<NavScreenProp<"Login">>();
  const [login, setLogin] = useState({ username: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const onLogin = async () => {
    setSubmitted(true);
    if (login.username && login.password) {
      await setIsLoggedIn(true);
      await setUsernameAction(login.username);
      navigation.navigate("Schedule");
    }
  };

  const onSignup = () => {
    // do something
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedView style={styles.loginLogo}>
          <Image
            source={images.app}
            style={styles.logo}
            accessibilityLabel="App logo"
          />
        </ThemedView>
        <ThemedView style={styles.loginForm}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText preset="sm" weight="medium" style={styles.label}>
              Username
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.white,
                  color: colors.text,
                },
              ]}
              value={login.username}
              onChangeText={(value) => setLogin({ ...login, username: value })}
              placeholder="Enter username"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Username input"
            />
            {submitted && !login.username && (
              <ThemedText preset="xs" style={styles.errorText} color="error">
                Username is required
              </ThemedText>
            )}
          </ThemedView>
          <ThemedView style={styles.inputContainer}>
            <ThemedText preset="sm" weight="medium" style={styles.label}>
              Password
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.white,
                  color: colors.text,
                },
              ]}
              value={login.password}
              onChangeText={(value) => setLogin({ ...login, password: value })}
              placeholder="Enter password"
              secureTextEntry
              accessibilityLabel="Password input"
            />
            {submitted && !login.password && (
              <ThemedText preset="xs" style={styles.errorText} color="error">
                Password is required
              </ThemedText>
            )}
          </ThemedView>
          <ThemedView style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.buttonPrimary,
                { backgroundColor: colors.primary },
                styles.flex1,
              ]}
              onPress={onLogin}
            >
              <ThemedText preset="sm" weight="semiBold" color="white">
                Login
              </ThemedText>
            </TouchableOpacity>
            <ThemedView style={styles.buttonSpacer} />
            <TouchableOpacity
              style={[
                styles.buttonSecondary,
                { backgroundColor: colors.lightGray },
                styles.flex1,
              ]}
              onPress={onSignup}
            >
              <ThemedText preset="sm" weight="semiBold" color="text">
                Signup
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  loginLogo: {
    minHeight: 200,
    paddingVertical: 20,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  loginForm: {
    padding: Platform.OS === "ios" ? 19 : 16,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorText: {
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  flex1: {
    flex: 1,
  },
  buttonPrimary: {
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: { elevation: 2 },
    }),
  },
  buttonSecondary: {
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: { elevation: 2 },
    }),
  },
  buttonSpacer: {
    width: 16,
  },
});

export default connect<{}, {}, LoginProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
  },
  component: LoginScreen,
});
