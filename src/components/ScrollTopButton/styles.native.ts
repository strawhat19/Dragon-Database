import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pressed: { opacity: 0.72 },
  action: { width: 48, height: 48 },
  layer: { ...StyleSheet.absoluteFillObject, alignItems: `center`, justifyContent: `center` },
});
