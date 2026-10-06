import { useState } from 'react';
import { View } from 'react-native';
import styles from './styles.native';
import Svg, { Path } from 'react-native-svg';

type AngledSurfaceProps = { id: string; fill: string; stroke?: string };

const AngledSurface = ({ id, fill, stroke }: AngledSurfaceProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const inset = stroke ? 0.5 : 0;
  const right = size.width - inset;
  const bottom = size.height - inset;
  const corner = Math.min(5, size.width / 2, size.height / 2);
  const path = `M${corner} ${inset}H${size.width - corner}L${right} ${corner}V${size.height - corner}L${size.width - corner} ${bottom}H${corner}L${inset} ${size.height - corner}V${corner}Z`;

  return (
    <View
      accessible={false}
      nativeID={id}
      testID={id}
      pointerEvents={`none`}
      accessibilityElementsHidden
      style={styles.surface}
      importantForAccessibility={`no-hide-descendants`}
      onLayout={({ nativeEvent }) => setSize({ width: nativeEvent.layout.width, height: nativeEvent.layout.height })}
    >
      {size.width > 0 && size.height > 0 && (
        <Svg width={size.width} height={size.height} accessible={false}>
          <Path d={path} fill={fill} stroke={stroke} strokeWidth={stroke ? 1 : 0} />
        </Svg>
      )}
    </View>
  );
};

export default AngledSurface;
