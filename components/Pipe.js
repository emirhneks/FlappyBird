// Boru Bileşeni: Kuşun Arasından Geçmesi Gereken Engelleri Oluşturma

import React from 'react';
import { View } from 'react-native';
import CONSTANTS from '../utils/constants';

// Üst veya Alt Boruyu Render Eden Bileşen
const Pipe = (props) => {
    // Borunun Pozisyon ve Boyut Bilgilerini Fizik Gövdesinden Alma
    const body = props.body || { position: { x: 0, y: 0 }, width: CONSTANTS.PIPE_WIDTH, height: 300 };
    const width = body.width || CONSTANTS.PIPE_WIDTH;
    const height = body.height || 300;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    return (
        <View
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
            }}
        >
            {/* Borunun Ana Gövdesi */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: CONSTANTS.COLORS.PIPE_BODY,
                    borderWidth: 3,
                    borderColor: CONSTANTS.COLORS.PIPE_BORDER,
                    overflow: 'hidden',
                }}
            >
                {/* Borunun Sol Tarafına Parlaklık Efekti Ekleme */}
                <View
                    style={{
                        position: 'absolute',
                        left: 4,
                        top: 0,
                        bottom: 0,
                        width: 8,
                        backgroundColor: CONSTANTS.COLORS.PIPE_HIGHLIGHT,
                        opacity: 0.5,
                    }}
                />
            </View>

            {/* Borunun Ağız Kısmı: Genişletilmiş Kenar */}
            <View
                style={{
                    position: 'absolute',
                    [props.isTop ? 'bottom' : 'top']: 0,
                    left: -4,
                    right: -4,
                    height: 28,
                    backgroundColor: CONSTANTS.COLORS.PIPE_BODY,
                    borderWidth: 3,
                    borderColor: CONSTANTS.COLORS.PIPE_BORDER,
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                {/* Boru Ağzının Parlaklık Efekti */}
                <View
                    style={{
                        position: 'absolute',
                        left: 4,
                        top: 2,
                        bottom: 2,
                        width: 8,
                        backgroundColor: CONSTANTS.COLORS.PIPE_HIGHLIGHT,
                        opacity: 0.5,
                    }}
                />
            </View>
        </View>
    );
};

export default Pipe;
