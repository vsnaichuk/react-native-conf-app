import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import {StorageService} from './StorageService';
import en from '../res/locales/en.json';
import ru from '../res/locales/ru.json';

const LANGUAGE_KEY = 'user_language';

export type SupportedLanguages = 'en' | 'ru';

const resources: Record<SupportedLanguages, {translation: typeof en}> = {
  en: {translation: en},
  ru: {translation: ru},
};

class Localization {
  private isValidLanguage(language: string): language is SupportedLanguages {
    return Object.keys(resources).includes(language);
  }

  private async detectLanguage(): Promise<SupportedLanguages> {
    const savedLanguage = (await StorageService.get({key: LANGUAGE_KEY})).value;
    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      return savedLanguage;
    }

    const deviceLanguage = getLocales()[0].languageCode;
    return this.isValidLanguage(deviceLanguage) ? deviceLanguage : 'en';
  }

  async initLocalization() {
    const language = await this.detectLanguage();
    i18n.use(initReactI18next).init({
      resources,
      lng: language,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  }

  getCurrentLanguage(): string {
    return i18n.language;
  }

  changeLanguage(lang: SupportedLanguages) {
    i18n.changeLanguage(lang);
    StorageService.set({key: LANGUAGE_KEY, value: lang});
  }
}

const LocalizationService = new Localization();
export {LocalizationService};
