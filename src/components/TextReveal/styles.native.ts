import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  words: { flexWrap: `wrap` },
  mask: { overflow: `hidden` },
  characters: { flexWrap: `nowrap` },
  visual: { flexDirection: `row`, alignItems: `flex-end` },
  text: { color: `#101115`, fontSize: 22, fontFamily: `DragonSlapper` },
});
