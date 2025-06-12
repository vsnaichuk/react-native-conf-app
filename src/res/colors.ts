import {Theme} from '@react-navigation/native';

export type CustomTheme = Theme & {
  colors: Theme['colors'] & {
    // React Navigation colors
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    // Custom colors
    secondary: string;
    tertiary: string;
    success: string;
    error: string;
    white: string;
    lightGray: string;
    textSecondary: string;
    favorite: string;
    twitter: string;
    instagram: string;
    vimeo: string;
    facebook: string;
    github: string;
    react: string;
    communication: string;
    tooling: string;
    services: string;
    design: string;
    workshop: string;
    food: string;
    documentation: string;
    navigation: string;
    transparent: string;
  };
};

export const lightTheme: CustomTheme = {
  dark: false,
  colors: {
    white: '#fff',
    lightGray: '#f4f5f8',
    primary: '#0054e9',
    secondary: '#0163aa',
    tertiary: '#6030ff',
    success: '#2dd55b',
    error: '#ff0000',
    textSecondary: '#757575',
    favorite: '#69bb7b',
    twitter: '#1da1f4',
    instagram: '#9537BC',
    vimeo: '#23b6ea',
    facebook: '#3b5998',
    github: '#211F1F',
    react: '#61dbfb',
    communication: '#8e8d93',
    tooling: '#fe4c52',
    services: '#fd8b2d',
    design: '#fed035',
    workshop: '#69bb7b',
    food: '#3bc7c4',
    documentation: '#b16be3',
    navigation: '#6600cc',
    border: 'rgb(160, 156, 156)',
    transparent: 'transparent',
  },
  fonts: {
    regular: {fontFamily: undefined},
    medium: {fontFamily: undefined},
    light: {fontFamily: undefined},
    thin: {fontFamily: undefined},
  },
};

export const darkTheme: CustomTheme = {
  dark: true,
  colors: {
    white: '#000',
    lightGray: '#f4f5f8',
    primary: '#0054e9',
    secondary: '#0163aa',
    tertiary: '#6030ff',
    success: '#2dd55b',
    error: '#ff0000',
    textSecondary: '#9e9e9e',
    favorite: '#69bb7b',
    twitter: '#1da1f4',
    instagram: '#9537BC',
    vimeo: '#23b6ea',
    facebook: '#3b5998',
    github: '#211F1F',
    react: '#61dbfb',
    communication: '#8e8d93',
    tooling: '#fe4c52',
    services: '#fd8b2d',
    design: '#fed035',
    workshop: '#69bb7b',
    food: '#3bc7c4',
    documentation: '#b16be3',
    navigation: '#6600cc',
    border: 'rgb(160, 156, 156)',
    transparent: 'transparent',
  },
  fonts: {
    regular: {
      fontFamily: undefined,
    },
    medium: {
      fontFamily: undefined,
    },
    light: {
      fontFamily: undefined,
    },
    thin: {
      fontFamily: undefined,
    },
  },
};

export const Colors = {};

export type Color = keyof CustomTheme['colors'];

export default Colors;
