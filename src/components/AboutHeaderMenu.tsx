import Icon from "@expo/vector-icons/Ionicons";
import { Linking, Platform } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../res/colors";

const AboutHeaderMenu = () => {
  const theme = useTheme() as CustomTheme;

  const openUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Icon
          name={
            Platform.OS === "ios" ? "ellipsis-horizontal" : "ellipsis-vertical"
          }
          size={24}
          color={theme.colors.text}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          key="learn-ionic"
          onSelect={() => openUrl("https://ionicframework.com/docs")}
        >
          <DropdownMenu.ItemTitle>Learn Ionic</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          key="documentation"
          onSelect={() => openUrl("https://ionicframework.com/docs/react")}
        >
          <DropdownMenu.ItemTitle>Documentation</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          key="showcase"
          onSelect={() => openUrl("https://showcase.ionicframework.com")}
        >
          <DropdownMenu.ItemTitle>Showcase</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          key="github"
          onSelect={() =>
            openUrl("https://github.com/ionic-team/ionic-framework")
          }
        >
          <DropdownMenu.ItemTitle>GitHub Repo</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item key="support">
          <DropdownMenu.ItemTitle>Support</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AboutHeaderMenu;
