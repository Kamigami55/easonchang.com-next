// https://gist.github.com/justincy/c1075650b1d5ba448c50eaf83cbb4ffe#configuring-i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true
});

export default i18n;
[]