// Ana Menü Ekranı: Oyuncuyu Karşılayan ve Oyunu Başlatan İlk Ekran

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CONSTANTS from '../utils/constants';

// Ana Menü Bileşeni: Oyna Butonuyla Oyunu Başlatma
const HomeScreen = ({ onPlay }) => {
    return (
        <View style={styles.container}>
            {/* Arka Plan Gökyüzü Gradyanı */}
            <View style={styles.skyBackground}>
                {/* Bulut Dekorasyonları */}
                <View style={[styles.cloud, { top: 80, left: 30 }]}>
                    <View style={styles.cloudPart} />
                    <View style={[styles.cloudPart, styles.cloudPartLarge]} />
                    <View style={styles.cloudPart} />
                </View>
                <View style={[styles.cloud, { top: 150, right: 40 }]}>
                    <View style={styles.cloudPartSmall} />
                    <View style={[styles.cloudPart, styles.cloudPartMedium]} />
                    <View style={styles.cloudPartSmall} />
                </View>
                <View style={[styles.cloud, { top: 220, left: 100 }]}>
                    <View style={styles.cloudPart} />
                    <View style={[styles.cloudPart, styles.cloudPartLarge]} />
                    <View style={styles.cloudPart} />
                </View>
            </View>

            {/* Oyun Başlığı */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Flappy Bird</Text>
            </View>


            {/* Kuş Karakterinin Önizlemesi */}
            <View style={styles.birdPreview}>
                <View style={styles.birdBody}>
                    {/* Kanat */}
                    <View style={styles.birdWing} />
                    {/* Göz */}
                    <View style={styles.birdEye}>
                        <View style={styles.birdPupil} />
                    </View>
                    {/* Gaga */}
                    <View style={styles.birdBeak} />
                </View>
            </View>

            {/* Oyna Butonu */}
            <TouchableOpacity style={styles.playButton} onPress={onPlay} activeOpacity={0.7}>
                <View style={styles.playButtonInner}>
                    <Text style={styles.playButtonText}>Oyna</Text>
                </View>
            </TouchableOpacity>

            {/* Zemin Dekorasyonu */}
            <View style={styles.groundDecor}>
                <View style={styles.grassStrip} />
                <View style={styles.groundFill} />
            </View>
        </View>
    );
};

// Ana Menü Ekranına Ait Stil Tanımları
const styles = StyleSheet.create({
    // Genel Kapsayıcı Konteyner
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Gökyüzü Arka Planı
    skyBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: CONSTANTS.COLORS.SKY_TOP,
    },

    // Bulut Kapsayıcısı
    cloud: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    // Bulut Parçaları için Stil Tanımları
    cloudPart: {
        width: 40,
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        opacity: 0.8,
        marginHorizontal: -5,
    },
    cloudPartLarge: {
        width: 50,
        height: 45,
    },
    cloudPartMedium: {
        width: 45,
        height: 35,
    },
    cloudPartSmall: {
        width: 30,
        height: 22,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        opacity: 0.8,
        marginHorizontal: -5,
    },

    // Oyun Başlık Alanı
    titleContainer: {
        marginBottom: 50,
        alignItems: 'center',
    },

    // Başlık Yazısı
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.WHITE,
        textShadowColor: CONSTANTS.COLORS.SCORE_STROKE,
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 6,
    },

    // Kuş Önizleme Alanı
    birdPreview: {
        marginBottom: 60,
    },

    // Kuş Gövdesi
    birdBody: {
        width: 60,
        height: 45,
        backgroundColor: CONSTANTS.COLORS.BIRD_BODY,
        borderRadius: 22,
        borderWidth: 3,
        borderColor: CONSTANTS.COLORS.BIRD_WING,
        justifyContent: 'center',
        overflow: 'visible',
    },

    // Kuş Kanadı
    birdWing: {
        position: 'absolute',
        left: 4,
        top: 18,
        width: 22,
        height: 14,
        backgroundColor: CONSTANTS.COLORS.BIRD_WING,
        borderRadius: 8,
    },

    // Kuş Gözü
    birdEye: {
        position: 'absolute',
        right: 10,
        top: 6,
        width: 16,
        height: 16,
        backgroundColor: CONSTANTS.COLORS.BIRD_EYE_WHITE,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: CONSTANTS.COLORS.BLACK,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Kuş Göz Bebeği
    birdPupil: {
        width: 8,
        height: 8,
        backgroundColor: CONSTANTS.COLORS.BIRD_EYE_BLACK,
        borderRadius: 4,
    },

    // Kuş Gagası
    birdBeak: {
        position: 'absolute',
        right: -8,
        top: 20,
        width: 16,
        height: 10,
        backgroundColor: CONSTANTS.COLORS.BIRD_BEAK,
        borderRadius: 4,
    },

    // Oyna Butonu Dış Kapsayıcı
    playButton: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },

    // Oyna Butonu İç Tasarım
    playButtonInner: {
        backgroundColor: '#5DBE3F',
        paddingHorizontal: 60,
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 3,
        borderColor: '#3E8E28',
        borderBottomWidth: 5,
    },

    // Oyna Butonu Yazısı
    playButtonText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.WHITE,
        textAlign: 'center',
        textShadowColor: '#3E8E28',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 2,
    },

    // Zemin Dekorasyon Kapsayıcısı
    groundDecor: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: CONSTANTS.GROUND_HEIGHT,
    },

    // Çim Şeridi
    grassStrip: {
        width: '100%',
        height: 6,
        backgroundColor: CONSTANTS.COLORS.GROUND_GRASS,
    },

    // Zemin Dolgusu
    groundFill: {
        flex: 1,
        backgroundColor: CONSTANTS.COLORS.GROUND_TOP,
    },
});

export default HomeScreen;
