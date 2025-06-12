import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../res/colors';

type ColorSchemeOptions = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: ColorSchemeOptions,
  colorName: keyof CustomTheme['colors'],
) {
  const theme = useTheme() as CustomTheme;
  const colorFromProps = props[theme.dark ? 'dark' : 'light'];

  return colorFromProps || theme.colors[colorName];
}
