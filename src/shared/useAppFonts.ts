import { useFonts } from 'expo-font';

export const useAppFonts = () => useFonts({
  DragonSlapper: require('../../assets/fonts/dragon-slapper-fontstruct/dragonslapper.ttf'),
  AlegreyaSans: require('../../assets/fonts/alegreya-sans/AlegreyaSans-Regular.ttf'),
  AlegreyaSansBold: require('../../assets/fonts/alegreya-sans/AlegreyaSans-Bold.ttf'),
  AlegreyaSansMedium: require('../../assets/fonts/alegreya-sans/AlegreyaSans-Medium.ttf'),
});
