import React, { useState } from "react";
import { Platform, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, parseISO } from "date-fns";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../res/colors";
import { ThemedText } from "./themed/ThemedText";

interface DatePickerFieldProps {
  value: string;
  onChange: (date: string) => void;
  maximumDate?: Date;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  value,
  onChange,
  maximumDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { colors } = useTheme() as CustomTheme;

  const displayDate = (date: string) => {
    return format(parseISO(date), "MMM dd, yyyy");
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      onChange(date.toISOString());
      if (Platform.OS === "android") {
        setShowDatePicker(false);
      }
    }
  };

  if (Platform.OS === "android") {
    return (
      <>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[styles.androidButton, { borderColor: colors.border }]}
        >
          <ThemedText preset="sm">{displayDate(value)}</ThemedText>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={parseISO(value)}
            mode="date"
            maximumDate={maximumDate}
            onChange={handleDateChange}
            style={styles.datePicker}
          />
        )}
      </>
    );
  }

  return (
    <DateTimePicker
      value={parseISO(value)}
      mode="date"
      maximumDate={maximumDate}
      onChange={handleDateChange}
      style={styles.datePicker}
    />
  );
};

const styles = StyleSheet.create({
  androidButton: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  datePicker: {
    flex: 1,
  },
});
