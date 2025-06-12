import Icon from "@expo/vector-icons/Ionicons";
import * as DropdownMenu from "zeego/dropdown-menu";
import { CustomTheme } from "../res/colors";
import { useTheme } from "@react-navigation/native";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";

type AboutLocationsMenuProps = {
  value: "madison" | "austin" | "chicago" | "seattle";
  onSelect: (location: "madison" | "austin" | "chicago" | "seattle") => void;
};

const AboutLocationsMenu = ({ value, onSelect }: AboutLocationsMenuProps) => {
  const theme = useTheme() as CustomTheme;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <ThemedView
          style={{
            flex: 1,
            height: 44,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 8,
          }}
        >
          <ThemedText style={{ fontSize: 16 }}>
            {value === "madison"
              ? "Madison, WI"
              : value === "austin"
              ? "Austin, TX"
              : value === "chicago"
              ? "Chicago, IL"
              : "Seattle, WA"}
          </ThemedText>
          <Icon name="chevron-down" size={16} color={theme.colors.text} />
        </ThemedView>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        style={{
          minWidth: 150,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background,
          padding: 8,
        }}
      >
        <DropdownMenu.Item key="madison" onSelect={() => onSelect("madison")}>
          <DropdownMenu.ItemTitle>Madison, WI</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item key="austin" onSelect={() => onSelect("austin")}>
          <DropdownMenu.ItemTitle>Austin, TX</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item key="chicago" onSelect={() => onSelect("chicago")}>
          <DropdownMenu.ItemTitle>Chicago, IL</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item key="seattle" onSelect={() => onSelect("seattle")}>
          <DropdownMenu.ItemTitle>Seattle, WA</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AboutLocationsMenu;
