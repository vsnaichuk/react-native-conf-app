import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Ionicons";
import { CustomTheme } from "../res/colors";
import { setUsername } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { NavScreenProp } from "../navigation/types";
import { ThemedText } from "../components/themed/ThemedText";
import { ThemedView } from "../components/themed/ThemedView";

interface OwnProps {}

interface StateProps {
  username?: string;
}

interface DispatchProps {
  setUsername: typeof setUsername;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const AccountScreen: React.FC<AccountProps> = ({
  setUsername,
  username = __DEV__ ? "user@dev.mode" : undefined,
}) => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation<NavScreenProp<"Account">>();
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [newUsername, setNewUsername] = useState(username || "");

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`);
  };

  const handleUsernameSubmit = () => {
    if (newUsername) {
      setUsername(newUsername);
      setShowUsernameModal(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {!!username && (
          <>
            <ThemedView style={styles.accountContainer}>
              <Image
                source={{ uri: "https://www.gravatar.com/avatar?d=mm&s=140" }}
                style={styles.avatar}
                accessibilityLabel="User avatar"
              />
              <ThemedText preset="xl" weight="semiBold" style={styles.username}>
                {username}
              </ThemedText>
            </ThemedView>

            <ThemedView
              style={[
                styles.list,
                { backgroundColor: colors.card || colors.white },
              ]}
            >
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => clicked("Update Picture")}
              >
                <ThemedText preset="sm">Update Picture</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => setShowUsernameModal(true)}
              >
                <ThemedText preset="sm">Change Username</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => clicked("Change Password")}
              >
                <ThemedText preset="sm">Change Password</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => navigation.navigate("About")}
              >
                <ThemedText preset="sm">Support</ThemedText>
                <Icon name="chevron-forward" size={16} color={colors.border} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.listItem, styles.noBorder]}
                onPress={() => navigation.navigate("Login")}
              >
                <ThemedText preset="sm">Logout</ThemedText>
                <Icon name="chevron-forward" size={16} color={colors.border} />
              </TouchableOpacity>
            </ThemedView>
          </>
        )}
      </ScrollView>
      <Modal
        visible={showUsernameModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowUsernameModal(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView
            style={[
              styles.modalContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <ThemedText preset="lg" weight="semiBold" style={styles.modalTitle}>
              Change Username
            </ThemedText>
            <TextInput
              style={[
                styles.modalInput,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.white,
                  color: colors.text,
                },
              ]}
              value={newUsername}
              onChangeText={setNewUsername}
              placeholder="Enter new username"
              autoCapitalize="none"
              accessibilityLabel="New username input"
            />
            <ThemedView style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowUsernameModal(false)}
              >
                <ThemedText preset="sm" weight="medium" color="primary">
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalButtonPrimary,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleUsernameSubmit}
              >
                <ThemedText preset="sm" weight="semiBold" color="white">
                  Ok
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
    alignItems: "center",
  },
  accountContainer: {
    paddingTop: Platform.OS === "ios" ? 24 : 20,
    alignItems: "center",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  username: {
    marginVertical: 12,
  },
  list: {
    width: "90%",
    borderRadius: 8,
    marginVertical: 16,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    marginBottom: 12,
  },
  modalInput: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    padding: 10,
    marginLeft: 8,
  },
  modalButtonPrimary: {
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
});

export default connect({
  mapStateToProps: (state: any) => ({
    username: state.user.username,
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: AccountScreen,
});
