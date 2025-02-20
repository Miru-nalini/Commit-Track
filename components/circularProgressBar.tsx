import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import { Canvas, Skia, Path, Text, SkFont } from '@shopify/react-native-skia';

type Props = {
    radius: number;
    strokeWidth: number;
    percentage: SharedValue<number>;
    end: SharedValue<number>;
    font: SkFont | null;
}

const circularProgressBar = ({ radius, strokeWidth, percentage, end, font }: Props) => {
    const innerRadius = radius - strokeWidth / 2;
    const path = Skia.Path.Make();
    path.addCircle(radius, radius, innerRadius);

    const targetText = useDerivedValue(() => {
        return `${Math.round(percentage.value)}%`;
    }
        , []);

    const fontSize = font?.measureText('00%');

    const textX = useDerivedValue(() => {
        const _fontSize = font?.measureText(targetText.value);
        return radius - (_fontSize?.width ?? 0) / 2;
    }
        , []);

    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
            <Canvas style={styles.container}>
                <Path
                    path={path}
                    strokeWidth={strokeWidth}
                    style={'stroke'}
                    color={'black'}
                    strokeJoin={'round'}
                    strokeCap={'round'}
                    start={0}
                    end={1} />

                <Path
                    path={path}
                    strokeWidth={strokeWidth}
                    style={'stroke'}
                    color={'lightGray'}
                    strokeJoin={'round'}
                    strokeCap={'round'}
                    start={0}
                    end={end} />

                <Text
                    x={textX}
                    y={radius + (fontSize?.height ?? 0) / 2}
                    text={targetText}
                    color={'white'}
                    font={font}

                />

            </Canvas>
        </View>
    )
}

export default circularProgressBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})