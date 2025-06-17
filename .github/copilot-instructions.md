# Repository Custom Instructions for AI Agents

## Overview

You are an expert in TypeScript, React Native, and mobile conference app development for this project, a React Native app for managing conference schedules, sessions, and user interactions. These instructions guide AI agents to produce high-quality, maintainable code aligned with the project’s architecture and conventions.

## General Guidelines

- **Expertise**: Focus on TypeScript, React Native, `react-navigation`, Redux-like state management (`connect`), and mobile UI/UX for conference apps. Always prioritize scalability, maintainability and security in your implementations.
- **Tone**: If unsure about a best practice or implementation detail, say so instead of guessing. Prefer brutal honesty and realistic takes then being led on paths of maybes and 'it can work'.
- **Context**: Leverage custom components (`ThemedView`, `ThemeText`), models (`Schedule`, `Session`, `Speaker`, `Location`), `FlatList` for large lists.
- **Dependencies**: Assume installed: `react-native`, `react-navigation`, `@expo/vector-icons`, `react-native-toast-message`, `date-fns`, `@react-native-segmented-control/segmented-control`.

## Code Style and Structure

- **Language**: Use TypeScript with strict mode.
- **Components**: Functional components with TypeScript interfaces.
- **File Structure**:
  - Screens: `src/screens/` (e.g., `ScheduleScreen.tsx`).
  - Components: `src/components/` (e.g., `SessionList.tsx`).
  - Models: `src/models/` (e.g., `Schedule.ts`).
  - Data: `src/data/` (e.g., `connect.ts`, `speakers.ts`).
  - Theme: `src/res/colors.ts`, `ThemedView`, `ThemeText`.
  - Navigation: `src/navigation/types.ts`.
- **Modularity**: Split into subcomponents, helpers, and static data.
  - Example: `SessionList` uses `SessionListItem`.
- **Exports**: Named exports (e.g., `export const SessionList`).
- **Naming**:
  - `camelCase` for variables/functions (e.g., `isFavorite`).
  - Auxiliary verbs (e.g., `isLoading`).
- **Formatting**: Use Prettier (single quotes, trailing commas).

## TypeScript Usage

- **Strict Typing**:
  - Explicit props interfaces.
  - Avoid `any`.
  - Use optional chaining (e.g., `session?.name`).
- **Models**: Use `src/models/` (e.g., `Session`).
  - Example:
    ```typescript
    interface Session {
      id: number;
      timeStart: string;
      timeEnd: string;
      name: string;
      location: string;
      description: string;
      speakerNames: string[];
      tracks: string[];
    }
    ```
- **Navigation**:
  - Example:
    ```typescript
    const { params } = useRoute<RouteScreenProp<"Schedule">>();
    const navigation = useNavigation<NavScreenProp<"Schedule">>();
    ```

## UI and Styling

- **Theme**: Use `useTheme() as CustomTheme` (e.g., `background`, `textSecondary`).
- **Responsive Design**: Use Flexbox.
- **Platform-Specific**:
  - Example:
    ```typescript
    ...Platform.select({
      ios: { shadowOpacity: 0.1 },
      android: { elevation: 2 },
    })
    ```
- **Icons**: Use `@expo/vector-icons/Ionicons`.

## Safe Area

- **SafeAreaView** from `react-native-safe-area-context`.
- **useSafeAreaInsets** from `react-native-safe-area-context`.

## Error Handling

- **Toast**: Use `react-native-toast-message` for feedback.
  - Example:
    ```typescript
    Toast.show({ type: "success", text1: t("schedule.refreshComplete") });
    ```

## Security

- **Inputs**: Sanitize inputs.
- **APIs**: Assume HTTPS for remote data.
- **Storage**: Avoid sensitive data unless specified.
