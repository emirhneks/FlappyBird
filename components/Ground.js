// Zemin Bileşeni: Oyun Alanının Alt Kısmındaki Kayan Zemin

import React from 'react';
import { View } from 'react-native';
import CONSTANTS from '../utils/constants';

// Zemini Render Eden ve Çim Detayı Ekleyen Bileşen
const Ground = (props) => {
    const width = CONSTANTS.SCREEN_WIDTH * 2;
    const height = CONSTANTS.GROUND_HEIGHT;

    return (
        <View
            style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: width,
                height: height,
            }}
        >
            {/* Zeminin Üst Kısmındaki Çim Şeridi */}
            <View
                style={{
                    width: '100%',
                    height: 6,
                    backgroundColor: CONSTANTS.COLORS.GROUND_GRASS,
                }}
            />

            {/* Zeminin Toprak Kısmı */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: CONSTANTS.COLORS.GROUND_TOP,
                    overflow: 'hidden',
                }}
            >
                {/* Toprak Üzerinde Doku Efekti Oluşturan Çizgiler */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <View
                        key={i}
                        style={{
                            position: 'absolute',
                            left: i * (width / 8),
                            top: 10,
                            width: 20,
                            height: 3,
                            backgroundColor: CONSTANTS.COLORS.GROUND_BOTTOM,
                            borderRadius: 2,
                            opacity: 0.5,
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default Ground;
