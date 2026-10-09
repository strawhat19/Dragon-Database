import { useState } from 'react';
import { View } from 'react-native';
import styles from './styles.native';
import Svg, { Path } from 'react-native-svg';

type CardCornersProps = { id: string; fill: string; stroke: string };

const CardCorners = ({ id, fill, stroke }: CardCornersProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { width, height } = size;
  const inset = 0.5;
  const corner = Math.min(16, width / 2, height / 2);
  const outline = `M${corner} ${inset}H${width - corner}L${width - inset} ${corner}V${height - corner}L${width - corner} ${height - inset}H${corner}L${inset} ${height - corner}V${corner}Z`;
  const cover = `M0 0H${corner}L0 ${corner}ZM${width - corner} 0H${width}V${corner}ZM${width} ${height - corner}V${height}H${width - corner}ZM${corner} ${height}H0V${height - corner}Z`;

  return (
    <View
      accessible={false}
      nativeID={id}
      pointerEvents={`none`}
      style={styles.corners}
      accessibilityElementsHidden
      importantForAccessibility={`no-hide-descendants`}
      onLayout={({ nativeEvent }) => setSize({ width: nativeEvent.layout.width, height: nativeEvent.layout.height })}
    >
      {width > 0 && height > 0 && (
        <Svg width={width} height={height} accessible={false}>
          <Path d={cover} fill={fill} />
          <Path d={outline} fill={`none`} stroke={stroke} strokeWidth={1} />
        </Svg>
      )}
    </View>
  );
};

export default CardCorners;
