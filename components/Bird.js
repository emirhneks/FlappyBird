// Kuş Bileşeni: Ekrana Çizilen ve Fizik Motoruyla Hareket Eden Ana Karakter

import React from 'react';
import { View } from 'react-native';
import CONSTANTS from '../utils/constants';

// Kuşun Görsel Olarak Render Edilmesini Sağlayan Bileşen
const Bird = (props) => {
    // Kuşun Pozisyon ve Hız Bilgilerini Güvenli Bir Şekilde Alma
    const body = props.body || { position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } };
    const x = body.position.x - CONSTANTS.BIRD_WIDTH / 2;
    const y = body.position.y - CONSTANTS.BIRD_HEIGHT / 2;

    // Kuşun Hızına Göre Dönme Açısını Hesaplama
    const velocity = body.velocity ? body.velocity.y : 0;
    const rotation = Math.min(Math.max(velocity * 3, -30), 90);

    return (
        <View
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: CONSTANTS.BIRD_WIDTH,
                height: CONSTANTS.BIRD_HEIGHT,
                transform: [{ rotate: `${rotation}deg` }],
            }}
        >
            {/* Kuşun Gövdesi */}
            <View
                style={{
                    width: CONSTANTS.BIRD_WIDTH,
                    height: CONSTANTS.BIRD_HEIGHT,
                    backgroundColor: CONSTANTS.COLORS.BIRD_BODY,
                    borderRadius: CONSTANTS.BIRD_HEIGHT / 2,
                    borderWidth: 2,
                    borderColor: CONSTANTS.COLORS.BIRD_WING,
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Kuşun Kanadı */}
                <View
                    style={{
                        position: 'absolute',
                        left: 2,
                        top: CONSTANTS.BIRD_HEIGHT * 0.35,
                        width: CONSTANTS.BIRD_WIDTH * 0.4,
                        height: CONSTANTS.BIRD_HEIGHT * 0.35,
                        backgroundColor: CONSTANTS.COLORS.BIRD_WING,
                        borderRadius: 6,
                    }}
                />
                {/* Kuşun Gözü: Beyaz Kısım */}
                <View
                    style={{
                        position: 'absolute',
                        right: 6,
                        top: 4,
                        width: 12,
                        height: 12,
                        backgroundColor: CONSTANTS.COLORS.BIRD_EYE_WHITE,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: CONSTANTS.COLORS.BLACK,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* Kuşun Gözü: Siyah Göz Bebeği */}
                    <View
                        style={{
                            width: 6,
                            height: 6,
                            backgroundColor: CONSTANTS.COLORS.BIRD_EYE_BLACK,
                            borderRadius: 3,
                        }}
                    />
                </View>
                {/* Kuşun Gagası */}
                <View
                    style={{
                        position: 'absolute',
                        right: -6,
                        top: CONSTANTS.BIRD_HEIGHT * 0.4,
                        width: 12,
                        height: 8,
                        backgroundColor: CONSTANTS.COLORS.BIRD_BEAK,
                        borderRadius: 3,
                    }}
                />
            </View>
        </View>
    );
};

export default Bird;
